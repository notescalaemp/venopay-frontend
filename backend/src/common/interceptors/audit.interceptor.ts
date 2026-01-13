import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../database/prisma.service';
import { AUDIT_KEY, AuditMetadata } from '../decorators/audit.decorator';
import { AuthUser } from '../types';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditMetadata = this.reflector.get<AuditMetadata>(
      AUDIT_KEY,
      context.getHandler(),
    );

    if (!auditMetadata) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user as AuthUser | undefined;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(async () => {
        const duration = Date.now() - startTime;

        try {
          await this.prisma.auditLog.create({
            data: {
              userId: user?.id || 'SYSTEM',
              action: auditMetadata.action,
              entity: auditMetadata.resource,
              entityId: request.params.id || request.body?.id || 'N/A',
              after: {
                method: request.method,
                path: request.path,
                statusCode: response.statusCode,
                duration,
                userAgent: request.headers['user-agent'],
              },
              ip: request.ip,
              userAgent: request.headers['user-agent'],
            },
          });
        } catch (error) {
          // Non-blocking: log audit errors but don't fail the request
          console.error('Failed to create audit log:', error);
        }
      }),
      catchError((error) => {
        // Still try to log failed requests
        this.prisma.auditLog
          .create({
            data: {
              userId: user?.id || 'SYSTEM',
              action: auditMetadata.action,
              entity: auditMetadata.resource,
              entityId: request.params.id || request.body?.id || 'N/A',
              after: {
                method: request.method,
                path: request.path,
                statusCode: response.statusCode || 500,
                duration: Date.now() - startTime,
                error: error.message,
              },
              ip: request.ip,
              userAgent: request.headers['user-agent'],
            },
          })
          .catch((auditError) => {
            console.error('Failed to log failed request:', auditError);
          });

        throw error;
      }),
    );
  }
}

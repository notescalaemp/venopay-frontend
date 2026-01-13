import { SetMetadata } from '@nestjs/common';
import { AuditAction } from '../types';

export const AUDIT_KEY = 'audit';

export interface AuditMetadata {
  action: AuditAction;
  resource: string;
}

/**
 * Decorator to mark endpoints that should be audited
 * Usage: @Audit({ action: 'CREATE', resource: 'User' })
 */
export const Audit = (metadata: AuditMetadata) => {
  return SetMetadata(AUDIT_KEY, metadata);
};

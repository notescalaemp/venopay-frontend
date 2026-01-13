import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto, ListUsersQueryDto } from './dto/update-user.dto';
import { buildPaginatedResponse, getPaginationOffset } from '../../common/utils';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../common/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ListUsersQueryDto) {
    const page = query.page || DEFAULT_PAGE;
    const pageSize = query.pageSize || DEFAULT_PAGE_SIZE;
    const offset = getPaginationOffset(page, pageSize);

    const where: any = {};
    if (query.role) where.role = query.role;
    if (query.status) where.status = query.status;
    if (query.email) where.email = { contains: query.email, mode: 'insensitive' };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: offset,
        take: pageSize,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return buildPaginatedResponse(users, total, page, pageSize);
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: updateDto,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent deleting admin if they're the last admin
    if (user.role === 'ADMIN') {
      const adminCount = await this.prisma.user.count({
        where: { role: 'ADMIN' },
      });

      if (adminCount === 1) {
        throw new BadRequestException('Cannot delete the last admin user');
      }
    }

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async activateUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === 'ACTIVE') {
      throw new BadRequestException('User is already active');
    }

    return this.prisma.user.update({
      where: { id },
      data: { status: 'ACTIVE' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      },
    });
  }

  async deactivateUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === 'INACTIVE') {
      throw new BadRequestException('User is already inactive');
    }

    return this.prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      },
    });
  }
}

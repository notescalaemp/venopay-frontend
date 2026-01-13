import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateManagerDto,
  UpdateManagerDto,
  ListManagersQueryDto,
} from './dto/create-manager.dto';
import { buildPaginatedResponse, getPaginationOffset } from '../../common/utils';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../common/constants';

@Injectable()
export class ManagersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ListManagersQueryDto) {
    const page = query.page || DEFAULT_PAGE;
    const pageSize = query.pageSize || DEFAULT_PAGE_SIZE;
    const offset = getPaginationOffset(page, pageSize);

    const where: any = {};
    if (query.department) where.user = { email: { contains: query.department, mode: 'insensitive' } };
    if (query.email) where.user = { email: { contains: query.email, mode: 'insensitive' } };

    const [managers, total] = await Promise.all([
      this.prisma.manager.findMany({
        where,
        skip: offset,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              status: true,
              createdAt: true,
            },
          },
        },
      }),
      this.prisma.manager.count({ where }),
    ]);

    const formattedManagers = managers.map(m => ({
      managerId: m.id,
      userId: m.userId,
      email: m.user.email,
      name: m.user.name,
      status: m.user.status,
      createdAt: m.user.createdAt,
    }));

    return buildPaginatedResponse(formattedManagers, total, page, pageSize);
  }

  async findById(id: string) {
    const manager = await this.prisma.manager.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    return {
      managerId: manager.id,
      userId: manager.userId,
      email: manager.user.email,
      name: manager.user.name,
      status: manager.user.status,
      createdAt: manager.user.createdAt,
      updatedAt: manager.user.updatedAt,
    };
  }

  async create(createManagerDto: CreateManagerDto) {
    // Check if user with this email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createManagerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Create user first, then manager
    const user = await this.prisma.user.create({
      data: {
        email: createManagerDto.email,
        name: createManagerDto.name,
        password: '', // Will be set by user in auth
        role: 'MANAGER',
        status: 'ACTIVE',
      },
    });

    const manager = await this.prisma.manager.create({
      data: {
        userId: user.id,
      },
    });

    return {
      id: manager.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      createdAt: user.createdAt,
    };
  }

  async update(id: string, updateDto: UpdateManagerDto) {
    const manager = await this.prisma.manager.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    const user = await this.prisma.user.update({
      where: { id: manager.userId },
      data: {
        name: updateDto.name,
      },
    });

    return {
      id: manager.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      updatedAt: user.updatedAt,
    };
  }

  async delete(id: string) {
    const manager = await this.prisma.manager.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    // Delete manager and cascade to user
    await this.prisma.manager.delete({
      where: { id },
    });

    return {
      id: manager.id,
      email: manager.user.email,
      name: manager.user.name,
    };
  }

  async activateManager(id: string) {
    const manager = await this.prisma.manager.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (manager.user.status === 'ACTIVE') {
      throw new BadRequestException('Manager is already active');
    }

    const user = await this.prisma.user.update({
      where: { id: manager.userId },
      data: { status: 'ACTIVE' },
    });

    return {
      id: manager.id,
      email: user.email,
      name: user.name,
      status: user.status,
    };
  }

  async deactivateManager(id: string) {
    const manager = await this.prisma.manager.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (manager.user.status === 'INACTIVE') {
      throw new BadRequestException('Manager is already inactive');
    }

    const user = await this.prisma.user.update({
      where: { id: manager.userId },
      data: { status: 'INACTIVE' },
    });

    return {
      id: manager.id,
      email: user.email,
      name: user.name,
      status: user.status,
    };
  }
}

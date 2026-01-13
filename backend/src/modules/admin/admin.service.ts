import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  AdminStatsQueryDto,
  AdminUsersFilterDto,
  AdminSellersFilterDto,
} from './dto/admin.dto';
import { buildPaginatedResponse, getPaginationOffset } from '../../common/utils';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../common/constants';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getSystemStats(query: AdminStatsQueryDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;

    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [totalUsers, totalSellers, totalManagers, totalAuditLogs] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.seller.count(),
        this.prisma.manager.count(),
        this.prisma.auditLog.count({ where }),
      ]);

    const [activeUsers, approvedSellers] = await Promise.all([
      this.prisma.user.count({ where: { status: 'ACTIVE' } }),
      this.prisma.seller.count({ where: { kycStatus: 'APPROVED' } }),
    ]);

    return {
      timestamp: new Date(),
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalSellers,
      approvedSellers,
      pendingSellers: totalSellers - approvedSellers,
      totalManagers,
      totalAuditLogs,
    };
  }

  async getAllUsers(query: AdminUsersFilterDto) {
    const page = query.page || DEFAULT_PAGE;
    const pageSize = query.pageSize || DEFAULT_PAGE_SIZE;
    const offset = getPaginationOffset(page, pageSize);

    const where: any = {};
    if (query.role) where.role = query.role;
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
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return buildPaginatedResponse(users, total, page, pageSize);
  }

  async getAllSellers(query: AdminSellersFilterDto) {
    const page = query.page || DEFAULT_PAGE;
    const pageSize = query.pageSize || DEFAULT_PAGE_SIZE;
    const offset = getPaginationOffset(page, pageSize);

    const where: any = {};
    if (query.kycStatus) where.kycStatus = query.kycStatus;
    if (query.email) where.user = { email: { contains: query.email, mode: 'insensitive' } };

    const [sellers, total] = await Promise.all([
      this.prisma.seller.findMany({
        where,
        skip: offset,
        take: pageSize,
        select: {
          id: true,
          businessName: true,
          document: true,
          phone: true,
          kycStatus: true,
          createdAt: true,
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.seller.count({ where }),
    ]);

    const formattedSellers = sellers.map(seller => ({
      id: seller.id,
      businessName: seller.businessName,
      email: seller.user?.email,
      name: seller.user?.name,
      document: seller.document,
      phone: seller.phone,
      kycStatus: seller.kycStatus,
      createdAt: seller.createdAt,
    }));

    return buildPaginatedResponse(formattedSellers, total, page, pageSize);
  }

  async getAuditLogs(page?: number, pageSize?: number) {
    const pageNum = page || DEFAULT_PAGE;
    const pageSizeNum = pageSize || DEFAULT_PAGE_SIZE;
    const offset = getPaginationOffset(pageNum, pageSizeNum);

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        skip: offset,
        take: pageSizeNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          entity: true,
          userId: true,
          ip: true,
          userAgent: true,
          createdAt: true,
        },
      }),
      this.prisma.auditLog.count(),
    ]);

    return buildPaginatedResponse(logs, total, pageNum, pageSizeNum);
  }

  async getSystemHealth() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const recentAuditLogs = await this.prisma.auditLog.count({
      where: { createdAt: { gte: oneHourAgo } },
    });

    return {
      status: 'healthy',
      timestamp: now,
      requestsLastHour: recentAuditLogs,
    };
  }

  async getUserActivityReport(page?: number, pageSize?: number) {
    const pageNum = page || DEFAULT_PAGE;
    const pageSizeNum = pageSize || DEFAULT_PAGE_SIZE;

    const activityByUser = await this.prisma.auditLog.findMany({
      distinct: ['userId'],
      select: {
        userId: true,
      },
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    });

    const userIds = activityByUser.map(a => a.userId);

    const activityData = await Promise.all(
      userIds.map(async (userId) => {
        const count = await this.prisma.auditLog.count({
          where: { userId },
        });
        return {
          userId,
          actionCount: count,
        };
      }),
    );

    const total = await this.prisma.auditLog.findMany({
      distinct: ['userId'],
      select: { userId: true },
    });

    return {
      data: activityData,
      total: total.length,
      page: pageNum,
      pageSize: pageSizeNum,
    };
  }
}

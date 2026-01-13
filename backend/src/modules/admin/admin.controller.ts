import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  AdminStatsQueryDto,
  AdminUsersFilterDto,
  AdminSellersFilterDto,
} from './dto/admin.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/roles.enum';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get system statistics' })
  async getSystemStats(@Query() query: AdminStatsQueryDto) {
    return this.adminService.getSystemStats(query);
  }

  @Get('health')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get system health status' })
  async getSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  @Get('users')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all users for admin' })
  async getAllUsers(@Query() query: AdminUsersFilterDto) {
    return this.adminService.getAllUsers(query);
  }

  @Get('sellers')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all sellers for admin' })
  async getAllSellers(@Query() query: AdminSellersFilterDto) {
    return this.adminService.getAllSellers(query);
  }

  @Get('audit-logs')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get audit logs' })
  async getAuditLogs(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getAuditLogs(page, pageSize);
  }

  @Get('activity-report')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get user activity report' })
  async getUserActivityReport(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.adminService.getUserActivityReport(page, pageSize);
  }
}

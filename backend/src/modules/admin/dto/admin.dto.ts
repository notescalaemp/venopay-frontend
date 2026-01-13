import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { UserRole, KYCStatus } from '@prisma/client';

export class AdminStatsQueryDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class AdminUsersFilterDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  email?: string;
}

export class AdminSellersFilterDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;

  @IsEnum(KYCStatus)
  @IsOptional()
  kycStatus?: KYCStatus;

  @IsString()
  @IsOptional()
  email?: string;
}

export class AdminSystemConfigDto {
  @IsString()
  @IsOptional()
  maintenanceMode?: boolean;

  @IsString()
  @IsOptional()
  maintenanceMessage?: string;
}

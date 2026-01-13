import { IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserRole, UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({
    enum: UserRole,
    required: false,
    description: 'Change user role',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    enum: UserStatus,
    required: false,
    description: 'Change user status',
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}

export class ListUsersQueryDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 20 })
  @IsOptional()
  pageSize?: number;

  @ApiProperty({ required: false, enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ required: false, enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}

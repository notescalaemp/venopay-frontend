import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { KYCStatus } from '@prisma/client';
import {
  PHONE_REGEX,
  CPF_REGEX,
  CNPJ_REGEX,
} from '../../../common/constants';

export class CreateSellerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  businessName: string;

  @IsEmail()
  email?: string;

  @IsString()
  @Matches(PHONE_REGEX)
  phone: string;

  @IsString()
  @Matches(CPF_REGEX)
  document: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsOptional()
  address?: string;
}

export class UpdateSellerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  businessName?: string;

  @IsString()
  @Matches(PHONE_REGEX)
  @IsOptional()
  phone?: string;

  @IsEnum(KYCStatus)
  @IsOptional()
  kycStatus?: KYCStatus;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsOptional()
  address?: string;
}

export class ListSellersQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;

  @IsEnum(KYCStatus)
  @IsOptional()
  kycStatus?: KYCStatus;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateSellerKycDto {
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED'])
  @IsOptional()
  kycStatus?: string;

  @IsString()
  @IsOptional()
  kycDocuments?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  rejectionReason?: string;
}

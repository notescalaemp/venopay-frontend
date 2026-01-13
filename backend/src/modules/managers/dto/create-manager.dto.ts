import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  department: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsOptional()
  description?: string;
}

export class UpdateManagerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  department?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsOptional()
  description?: string;
}

export class ListManagersQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  department?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

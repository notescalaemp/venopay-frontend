import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SellersService } from './sellers.service';
import {
  CreateSellerDto,
  UpdateSellerDto,
  ListSellersQueryDto,
  UpdateSellerKycDto,
} from './dto/create-seller.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Audit } from '../../common/decorators/audit.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Role } from '../../common/enums/roles.enum';

@ApiTags('sellers')
@ApiBearerAuth()
@Controller('sellers')
export class SellersController {
  constructor(private sellersService: SellersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'List all sellers with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Sellers list returned' })
  async findAll(@Query() query: ListSellersQueryDto) {
    return this.sellersService.findAll(query);
  }

  @Get('pending/approval')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Get sellers pending KYC approval' })
  @ApiResponse({ status: 200, description: 'Pending sellers list' })
  async getPendingApproval() {
    return this.sellersService.getSellersForApproval();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Get seller by ID' })
  @ApiResponse({ status: 200, description: 'Seller found' })
  @ApiResponse({ status: 404, description: 'Seller not found' })
  async findById(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Post()
  @Public()
  @Audit({ action: 'CREATE', resource: 'seller' })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new seller account' })
  @ApiResponse({ status: 201, description: 'Seller created successfully' })
  @ApiResponse({ status: 400, description: 'Email or document already registered' })
  async create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @Audit({ action: 'UPDATE', resource: 'seller' })
  @ApiOperation({ summary: 'Update seller information' })
  @ApiResponse({ status: 200, description: 'Seller updated' })
  @ApiResponse({ status: 404, description: 'Seller not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @Audit({ action: 'DELETE', resource: 'seller' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete seller' })
  @ApiResponse({ status: 204, description: 'Seller deleted' })
  @ApiResponse({ status: 404, description: 'Seller not found' })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete approved seller',
  })
  async delete(@Param('id') id: string) {
    return this.sellersService.delete(id);
  }

  @Patch(':id/kyc')
  @Roles(Role.ADMIN, Role.MANAGER)
  @Audit({ action: 'UPDATE', resource: 'seller' })
  @ApiOperation({ summary: 'Update seller KYC status' })
  @ApiResponse({ status: 200, description: 'KYC status updated' })
  @ApiResponse({
    status: 400,
    description: 'Invalid status transition',
  })
  async updateKycStatus(
    @Param('id') id: string,
    @Body() updateKycDto: UpdateSellerKycDto,
  ) {
    return this.sellersService.updateKycStatus(id, updateKycDto);
  }
}

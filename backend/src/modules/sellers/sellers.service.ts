import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateSellerDto,
  UpdateSellerDto,
  ListSellersQueryDto,
  UpdateSellerKycDto,
} from './dto/create-seller.dto';
import { buildPaginatedResponse, getPaginationOffset } from '../../common/utils';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../common/constants';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ListSellersQueryDto) {
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

    const formattedSellers = sellers.map(s => ({
      id: s.id,
      businessName: s.businessName,
      document: s.document,
      phone: s.phone,
      kycStatus: s.kycStatus,
      email: s.user?.email,
      createdAt: s.createdAt,
    }));

    return buildPaginatedResponse(formattedSellers, total, page, pageSize);
  }

  async findById(id: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
      select: {
        id: true,
        businessName: true,
        document: true,
        phone: true,
        address: true,
        kycStatus: true,
        kycDocuments: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return {
      ...seller,
      email: seller.user?.email,
      name: seller.user?.name,
    };
  }

  async create(createSellerDto: CreateSellerDto) {
    // Check if document already exists
    const existingDocument = await this.prisma.seller.findUnique({
      where: { document: createSellerDto.document },
    });

    if (existingDocument) {
      throw new BadRequestException('Document already registered');
    }

    // Create seller (requires acquirerId, feeConfigId, retentionConfigId from Prisma)
    // For now, using dummy data - should be provided or created in a real scenario
    const acquirer = await this.prisma.acquirer.findFirst();
    const feeConfig = await this.prisma.feeConfig.findFirst();
    const retentionConfig = await this.prisma.retentionConfig.findFirst();

    if (!acquirer || !feeConfig || !retentionConfig) {
      throw new BadRequestException(
        'System not properly configured: missing acquirer, fee config, or retention config',
      );
    }

    return this.prisma.seller.create({
      data: {
        businessName: createSellerDto.businessName,
        document: createSellerDto.document,
        phone: createSellerDto.phone,
        address: createSellerDto.address ? JSON.parse(createSellerDto.address) : {},
        kycStatus: 'PENDING',
        acquirerId: acquirer.id,
        feeConfigId: feeConfig.id,
        retentionConfigId: retentionConfig.id,
        userId: '', // Will be set by caller if needed
      },
      select: {
        id: true,
        businessName: true,
        document: true,
        phone: true,
        kycStatus: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateSellerDto) {
    const seller = await this.prisma.seller.findUnique({ where: { id } });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return this.prisma.seller.update({
      where: { id },
      data: {
        businessName: updateDto.businessName,
        phone: updateDto.phone,
        kycStatus: updateDto.kycStatus,
        address: updateDto.address ? JSON.parse(updateDto.address) : undefined,
      },
      select: {
        id: true,
        businessName: true,
        document: true,
        phone: true,
        kycStatus: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    const seller = await this.prisma.seller.findUnique({ where: { id } });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return this.prisma.seller.delete({
      where: { id },
      select: {
        id: true,
        businessName: true,
      },
    });
  }

  async updateKycStatus(id: string, updateKycDto: UpdateSellerKycDto) {
    const seller = await this.prisma.seller.findUnique({ where: { id } });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return this.prisma.seller.update({
      where: { id },
      data: {
        kycStatus: updateKycDto.kycStatus as any,
        kycDocuments: updateKycDto.kycDocuments
          ? JSON.parse(updateKycDto.kycDocuments)
          : undefined,
      },
      select: {
        id: true,
        document: true,
        businessName: true,
        kycStatus: true,
      },
    });
  }

  async getSellersForApproval() {
    return this.prisma.seller.findMany({
      where: { kycStatus: 'PENDING' },
      select: {
        id: true,
        businessName: true,
        document: true,
        phone: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}

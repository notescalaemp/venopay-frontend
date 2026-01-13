import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const password = await bcrypt.hash('Admin@123', 12);

  // 1. Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@gateway.com',
      password,
      name: 'Admin Master',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // 2. Create Manager
  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@gateway.com',
      password,
      name: 'Manager Test',
      role: 'MANAGER',
      status: 'ACTIVE',
      manager: { create: {} },
    },
  });
  console.log('✅ Manager created:', managerUser.email);

  // 3. Create Default Fee Config
  const feeConfig = await prisma.feeConfig.create({
    data: {
      cashInType: 'PERCENTAGE',
      cashInFixed: 0,
      cashInPercentage: 2.99,
      cashOutType: 'FIXED',
      cashOutFixed: 5.00,
      cashOutPercentage: 0,
    },
  });
  console.log('✅ Fee config created');

  // 4. Create Default Retention Config
  const retentionConfig = await prisma.retentionConfig.create({
    data: {
      retentionDays: 14,
      retentionPercent: 10,
    },
  });
  console.log('✅ Retention config created');

  // 5. Create Stripe Acquirer
  const stripe = await prisma.acquirer.create({
    data: {
      name: 'Stripe',
      type: 'STRIPE',
      credentials: JSON.stringify({ secretKey: 'sk_test_...', webhookSecret: 'whsec_...' }),
      isActive: true,
      supportedMethods: ['CREDIT_CARD', 'DEBIT_CARD'],
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'BRL'],
    },
  });
  console.log('✅ Stripe acquirer created');

  // 6. Create Test Seller
  const seller = await prisma.user.create({
    data: {
      email: 'seller@test.com',
      password,
      name: 'Test Seller',
      role: 'SELLER',
      status: 'ACTIVE',
      seller: {
        create: {
          businessName: 'Test Business',
          document: '12345678000190',
          phone: '+5511999999999',
          address: {
            street: 'Rua Teste',
            number: '123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            country: 'BR',
          },
          kycStatus: 'APPROVED',
          managerId: managerUser.manager?.id,
          acquirerId: stripe.id,
          feeConfigId: feeConfig.id,
          retentionConfigId: retentionConfig.id,
          wallet: { create: {} },
        },
      },
    },
  });
  console.log('✅ Seller created:', seller.email);

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

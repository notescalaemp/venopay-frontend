import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Prisma shutdown hooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Payment Gateway API')
    .setDescription('Multi-acquirer payment gateway platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('sellers', 'Seller management')
    .addTag('managers', 'Manager management')
    .addTag('admin', 'Admin endpoints')
    .addTag('payments', 'Payment processing')
    .addTag('wallet', 'Wallet management')
    .addTag('checkout', 'Checkout builder')
    .addTag('pix', 'PIX payments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`
    🚀 Server running on: http://localhost:${port}
    📚 API Docs: http://localhost:${port}/api-docs
    🗄️  Database: Connected
  `);
}

bootstrap();

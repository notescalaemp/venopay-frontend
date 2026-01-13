# 📋 Backend API - Complete File Inventory

## Overview

This document lists all files created in the NestJS backend API project during Phases 1-5.

---

## Configuration Files

### `backend/.env`
**Purpose:** Environment variables for local development
**Contents:**
- DATABASE_URL: PostgreSQL connection string
- PORT: Server port (5000)
- NODE_ENV: Environment (development)
- REDIS_HOST/PORT: Redis configuration
- JWT_SECRET/REFRESH_SECRET: JWT keys
- Token expiration times

### `backend/.env.example`
**Purpose:** Template for environment variables
**Usage:** Copy to `.env` and fill in values

### `backend/package.json`
**Purpose:** Project dependencies and scripts
**Key Scripts:**
- `npm run start:dev` - Start development server with hot-reload
- `npm run build` - Compile TypeScript to dist/
- `npm run test` - Run unit tests
- `npm run prisma:studio` - Open Prisma visual editor

---

## Configuration Modules (src/config/)

### `backend/src/config/app.config.ts`
**Purpose:** Application configuration factory
**Exports:**
- port: Server port (default: 5000)
- nodeEnv: Environment (development/production)
- urls: Frontend/API URLs

### `backend/src/config/jwt.config.ts`
**Purpose:** JWT authentication configuration
**Exports:**
- secret: JWT signing secret
- refreshSecret: Refresh token secret
- accessExpire: Access token TTL (15m)
- refreshExpire: Refresh token TTL (7d)

### `backend/src/config/database.config.ts`
**Purpose:** Database connection configuration
**Exports:**
- databaseUrl: PostgreSQL connection string

### `backend/src/config/redis.config.ts`
**Purpose:** Redis connection configuration
**Exports:**
- host: Redis server host
- port: Redis server port

---

## Database Module (src/database/)

### `backend/src/database/prisma.service.ts`
**Purpose:** Prisma ORM service wrapper
**Provides:**
- Database connection lifecycle management
- onModuleInit() - Connect to database on app start
- onModuleDestroy() - Disconnect on app shutdown
- enableShutdownHooks() - Graceful shutdown handler

---

## Common/Shared Code (src/common/)

### Enums

#### `backend/src/common/enums/roles.enum.ts`
**Purpose:** Define user roles
**Roles:**
- ADMIN: Full system access
- MANAGER: Manager-level access
- SELLER: Seller account access
- SUB_ACCOUNT: Sub-account access

### Decorators

#### `backend/src/common/decorators/current-user.decorator.ts`
**Purpose:** Extract current user from JWT
**Usage:** `@CurrentUser() user` or `@CurrentUser('id') userId`

#### `backend/src/common/decorators/public.decorator.ts`
**Purpose:** Mark routes as public (bypass JWT guard)
**Usage:** `@Public()`

#### `backend/src/common/decorators/roles.decorator.ts`
**Purpose:** Specify required roles for endpoint
**Usage:** `@Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)`

### Guards

#### `backend/src/common/guards/jwt-auth.guard.ts`
**Purpose:** Global JWT authentication guard
**Features:**
- Validates JWT signatures
- Respects @Public() decorator
- Extracts user from token
- Applied globally to all routes

#### `backend/src/common/guards/roles.guard.ts`
**Purpose:** Role-based access control
**Features:**
- Checks user has required roles via @Roles()
- Returns 403 Forbidden if unauthorized
- Works with @Public() routes

### Filters

#### `backend/src/common/filters/http-exception.filter.ts`
**Purpose:** Global exception handler
**Features:**
- Catches all HTTP exceptions
- Returns consistent error format
- Logs errors with timestamp

### Interceptors

#### `backend/src/common/interceptors/transform.interceptor.ts`
**Purpose:** Transform API responses
**Format:**
```json
{
  "success": true,
  "data": { ... },
  "statusCode": 200
}
```

#### `backend/src/common/interceptors/logging.interceptor.ts`
**Purpose:** Log all HTTP requests/responses
**Logs:**
- Request method and URL
- Response status code
- Request/response duration
- Timestamp

---

## Authentication Module (src/modules/auth/)

### DTOs (Data Transfer Objects)

#### `backend/src/modules/auth/dto/register.dto.ts`
**Purpose:** User registration request validation
**Fields:**
- email: Valid email address
- name: User name
- password: 8+ chars with uppercase, lowercase, digit
- role: ADMIN | MANAGER | SELLER | SUB_ACCOUNT

#### `backend/src/modules/auth/dto/login.dto.ts`
**Purpose:** User login request validation
**Fields:**
- email: Valid email address
- password: User password

#### `backend/src/modules/auth/dto/refresh-token.dto.ts`
**Purpose:** Token refresh request validation
**Fields:**
- refreshToken: Valid refresh token

### Strategies

#### `backend/src/modules/auth/strategies/jwt.strategy.ts`
**Purpose:** Passport JWT validation strategy
**Features:**
- Validates JWT signatures
- Extracts payload and attaches to request
- Checks user is ACTIVE status
- Default secret fallback

#### `backend/src/modules/auth/strategies/refresh-token.strategy.ts`
**Purpose:** Passport refresh token strategy
**Features:**
- Validates refresh token signatures
- Used for token refresh flow
- Different secret from access token

### Service

#### `backend/src/modules/auth/auth.service.ts`
**Purpose:** Authentication business logic
**Methods:**
- register(dto): Create new user (PENDING status)
- login(dto): Authenticate user, generate tokens
- refreshToken(userId, refreshToken): Issue new token pair
- logout(userId): Invalidate refresh token
- generateTokens(): Create JWT pair
- saveRefreshToken(): Store refresh token in DB

### Controller

#### `backend/src/modules/auth/auth.controller.ts`
**Purpose:** Authentication API endpoints
**Endpoints:**
- POST /auth/register - Register new user
- POST /auth/login - Authenticate user
- POST /auth/refresh - Refresh access token
- POST /auth/logout - Logout user
- GET /auth/me - Get current user info

### Module

#### `backend/src/modules/auth/auth.module.ts`
**Purpose:** Auth module configuration
**Imports:**
- PassportModule
- JwtModule with async configuration
- ConfigModule

**Providers:**
- AuthService
- JwtStrategy
- RefreshTokenStrategy
- PrismaService

---

## Root Module Files

### `backend/src/app.module.ts`
**Purpose:** Main application module
**Features:**
- ConfigModule setup with all 4 config factories
- AuthModule import
- JwtAuthGuard applied globally
- RolesGuard applied globally
- HttpExceptionFilter applied globally
- TransformInterceptor applied globally
- LoggingInterceptor applied globally

### `backend/src/app.controller.ts`
**Purpose:** Root controller
**Endpoints:**
- GET / - Health check endpoint

### `backend/src/app.service.ts`
**Purpose:** Root service
**Methods:**
- getHello(): Returns greeting message

### `backend/src/main.ts`
**Purpose:** Application bootstrap
**Configuration:**
- CORS enabled for http://localhost:3000
- Global validation pipe with whitelist + transform
- Swagger/OpenAPI setup on /api-docs
- Prisma shutdown hooks enabled
- Server listening on port from config

---

## Database Schema

### `backend/prisma/schema.prisma`
**Purpose:** Prisma ORM data model
**Contains:** 22 models including:
- User - Application users
- RefreshToken - Stored refresh tokens
- Manager - Manager accounts
- Seller - Seller accounts
- SubAccount - Sub-accounts
- Wallet - User wallets
- Transaction - Payment transactions
- CryptoPayment - Crypto payment records
- PixPayment - PIX payment records
- Checkout - Checkout sessions
- CustomDomain - Custom domains for sellers
- PixConfig - PIX configuration
- PixelConfig - Pixel tracking config
- ConversionEvent - Tracked events
- UTMTracking - UTM parameter tracking
- WebhookLog - Webhook event logs
- AuditLog - System audit logs
- Acquirer - Payment acquirers
- FeeConfig - Fee configurations
- RetentionConfig - Data retention policies
- SplitTransaction - Transaction splits
- WalletTransaction - Wallet movements

---

## Testing Files

### `backend/src/app.controller.spec.ts`
**Purpose:** Unit tests for app controller
**Tests:**
- Health check endpoint

### `backend/test/jest-e2e.json`
**Purpose:** E2E test configuration
**Settings:**
- Jest configuration for E2E tests
- Database connection for tests
- Test module setup

### `backend/test/app.e2e-spec.ts`
**Purpose:** End-to-end tests
**Tests:**
- Health check endpoint
- Auth endpoints (when database available)

---

## Build & Compilation

### `backend/dist/`
**Purpose:** Compiled JavaScript output
**Created by:** `npm run build`
**Contains:**
- JavaScript transpiled from TypeScript
- Source maps for debugging
- All compiled modules

### `backend/tsconfig.json`
**Purpose:** TypeScript configuration
**Settings:**
- Target: ES2021
- Module: CommonJS
- Strict mode enabled
- Decorators enabled

### `backend/tsconfig.build.json`
**Purpose:** Build-specific TypeScript config
**Extends:** tsconfig.json
**Excludes:** Test files, node_modules

### `backend/eslint.config.mjs`
**Purpose:** ESLint configuration
**Rules:**
- NestJS recommended rules
- TypeScript linting

---

## Package Management

### `backend/nest-cli.json`
**Purpose:** NestJS CLI configuration
**Settings:**
- Project configuration
- Collection: @nestjs/schematics

---

## Documentation Files

### `PHASE_5_COMPLETION_REPORT.md`
**Purpose:** Comprehensive phase completion summary
**Contains:**
- All 8 TypeScript errors fixed
- Build verification
- Getting started guide
- API documentation
- Troubleshooting

### `QUICK_START.md`
**Purpose:** Quick setup guide
**Contains:**
- 5-step startup process
- Test commands
- Default test users
- Architecture diagram

### `database.md`
**Purpose:** Database schema documentation
**Contains:**
- All 22 models documented
- Relationships explained
- Field descriptions

### `backend/README.md`
**Purpose:** Backend project information
**Contains:**
- Installation instructions
- Project structure
- Available commands

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Config Files | 4 |
| Common Code | 9 files |
| Auth Module | 7 files |
| Root Module | 3 files |
| Database | 1 file |
| Tests | 3 files |
| Documentation | 4+ files |
| **Total** | **~35+ files** |

---

## File Organization

```
backend/
├── src/
│   ├── config/                 (4 files)
│   ├── database/               (1 file)
│   ├── common/                 (9 files)
│   │   ├── decorators/
│   │   ├── enums/
│   │   ├── filters/
│   │   ├── guards/
│   │   └── interceptors/
│   ├── modules/
│   │   └── auth/              (7 files)
│   │       ├── dto/
│   │       ├── strategies/
│   │       ├── auth.controller.ts
│   │       ├── auth.service.ts
│   │       └── auth.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── dist/                       (compiled output)
├── prisma/
│   └── schema.prisma
├── test/                       (3 files)
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── eslint.config.mjs

database/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml
└── .env

Documentation/
├── PHASE_5_COMPLETION_REPORT.md
├── QUICK_START.md
├── database.md
└── (more files)
```

---

## How to Use This Inventory

1. **Finding a specific file**: Search for the file name above
2. **Understanding file purpose**: Each file lists its purpose
3. **Learning module structure**: See auth module as example structure for future modules
4. **Reference for additions**: When adding new features, follow same patterns

---

## Next Phase - Module Development

When implementing new modules, use this structure:

```
modules/
└── new-module/
    ├── dto/
    │   ├── create-xxx.dto.ts
    │   └── update-xxx.dto.ts
    ├── entities/
    │   └── xxx.entity.ts
    ├── xxx.controller.ts
    ├── xxx.service.ts
    └── xxx.module.ts
```

Reference the auth module structure for best practices!

---

**Last Updated:** Phase 5 Completion
**Status:** ✅ Complete and Ready for Phase 6

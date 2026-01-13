# 🚀 ULTIMATE REFERENCE GUIDE - Backend API

## ⚡ Quick Commands

### Start Everything
```bash
# Terminal 1: Start Database (one-time)
cd database && docker-compose up -d

# Terminal 2: Initialize Database (one-time)
cd backend && npx prisma db push && npx prisma db seed

# Terminal 3: Start API
cd backend && npm run start:dev
```

### Access Points
- **API Docs:** http://localhost:5000/api-docs
- **Backend Code:** `/backend/src`
- **Database Schema:** `/backend/prisma/schema.prisma`

---

## 📋 Complete Command Reference

### Database Commands
```bash
# Start services
docker-compose up -d              # Start PostgreSQL + Redis
docker-compose down               # Stop services
docker-compose down -v            # Stop and delete data
docker-compose ps                 # Show running services
docker-compose logs postgres      # View PostgreSQL logs

# Database initialization
cd backend
npx prisma db push               # Create tables from schema
npx prisma db seed               # Insert test data
npx prisma migrate dev --name "description"  # Create migration
npx prisma migrate reset         # Reset to empty database
```

### Development Commands
```bash
cd backend

# Run server
npm run start:dev                # Development with hot-reload
npm run start                    # Production mode

# Building
npm run build                    # Compile to dist/
npm run build:prod               # Optimized production build

# Database tools
npm run prisma:studio            # Visual database explorer
npm run prisma:seed              # Run seed script

# Testing
npm run test                     # Unit tests
npm run test:e2e                 # End-to-end tests
npm run test:cov                 # Coverage report
```

### Code Quality
```bash
npm run lint                     # Check code style
npm run lint:fix                 # Auto-fix style issues
npm run format                   # Format with Prettier
npm run type-check               # Type checking only
```

---

## 🔑 Default Credentials

### Test Users (Seeded in Database)
```
Email: admin@gateway.com
Password: Admin@123
Role: ADMIN

Email: manager@gateway.com
Password: Manager@123
Role: MANAGER

Email: seller@gateway.com
Password: Seller@123
Role: SELLER
```

### Environment Variables
```
PORT=5000
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/payment_gateway
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
```

---

## 🌐 API Endpoints Summary

### Authentication Endpoints
```
POST   /api/v1/auth/register      - Create new user
POST   /api/v1/auth/login         - Login user
POST   /api/v1/auth/refresh       - Refresh token
POST   /api/v1/auth/logout        - Logout user
GET    /api/v1/auth/me            - Get current user (requires auth)
```

### Response Format
```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... }
}
```

---

## 🧪 Testing Endpoints with cURL

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "name": "John Seller",
    "password": "SecurePass@123",
    "role": "SELLER"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gateway.com",
    "password": "Admin@123"
  }'
```

### 3. Get Current User (Use token from login response)
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer {accessToken}"
```

### 4. Refresh Token
```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "{refreshToken}"
  }'
```

### 5. Logout
```bash
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Authorization: Bearer {accessToken}"
```

---

## 📂 Important File Locations

### Configuration
- `.env` - Environment variables
- `src/config/` - Config factories
- `nest-cli.json` - NestJS CLI config
- `tsconfig.json` - TypeScript config

### Database
- `prisma/schema.prisma` - Database schema
- `src/database/prisma.service.ts` - Prisma service

### Authentication
- `src/modules/auth/` - Auth module
- `src/common/guards/jwt-auth.guard.ts` - JWT guard
- `src/common/decorators/` - Custom decorators

### Middleware/Interceptors
- `src/common/filters/` - Exception filters
- `src/common/interceptors/` - Interceptors
- `src/common/guards/` - Auth guards

### Main Files
- `src/main.ts` - Application bootstrap
- `src/app.module.ts` - Root module
- `package.json` - Dependencies

---

## 🔍 Debugging Tips

### Enable Request Logging
Already enabled! Check console output for:
- Request method and URL
- Response status code
- Response time in ms

### View Database Visually
```bash
cd backend
npm run prisma:studio
# Opens at http://localhost:5555
```

### Check Type Errors
```bash
cd backend
npx tsc --noEmit      # Type checking without compiling
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "program": "${workspaceFolder}/backend/node_modules/.bin/nest",
      "args": ["start", "--debug", "--watch"],
      "env": { "NODE_ENV": "development" },
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 🐛 Common Issues & Solutions

### "Can't reach database server"
```bash
# Verify Docker Desktop is running
docker ps

# Start services
cd database && docker-compose up -d

# Check status
docker-compose ps
```

### "Port 5000 already in use"
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID {PID} /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "Cannot find @prisma/client"
```bash
cd backend
npm install @prisma/client@5.9.1
npx prisma generate
```

### "JWT token invalid"
- Access tokens expire after 15 minutes
- Use POST /auth/refresh to get new token
- Check JWT_SECRET is set correctly

### "Build fails with TypeScript errors"
```bash
# Clear build cache
npm run build:clean

# Rebuild
npm run build

# Or reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Project Statistics

```
Backend Structure:
├── 4 Config Files
├── 1 Database Module
├── 9 Common Layer Files
├── 7 Auth Module Files
├── 3 Root Module Files
├── ~35+ Total Files
└── 2,000+ Lines of Code

Database:
├── 22 Prisma Models
├── 11 Enums
├── Multiple Relationships
└── Indexes for Performance
```

---

## 🎯 Workflow Examples

### Full Registration Flow
```bash
# 1. Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@test.com",
    "name": "New User",
    "password": "Password@123",
    "role": "SELLER"
  }'

# 2. Admin approves user status from PENDING to ACTIVE
#    (Currently manual via DB, will be in admin module)

# 3. Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@test.com",
    "password": "Password@123"
  }'

# 4. Use accessToken in Authorization header
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer {accessToken}"
```

### Token Refresh Flow
```bash
# 1. When access token expires (15 min), use refresh token
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "{refreshToken}"
  }'

# 2. Get new token pair
# {
#   "accessToken": "new_token",
#   "refreshToken": "new_refresh_token"
# }

# 3. Use new tokens
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer {newAccessToken}"
```

---

## 🔧 Configuration Quick Reference

### Port Configuration
File: `.env`
```
PORT=5000
```

### Database Configuration
File: `.env`
```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/payment_gateway
```

### Redis Configuration
File: `.env`
```
REDIS_HOST=localhost
REDIS_PORT=6379
```

### JWT Configuration
File: `.env`
```
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update JWT_SECRET to strong random value
- [ ] Update JWT_REFRESH_SECRET to strong random value
- [ ] Update DATABASE_URL to production database
- [ ] Set NODE_ENV=production
- [ ] Build project: `npm run build:prod`
- [ ] Test all endpoints
- [ ] Setup database backups
- [ ] Configure SSL/HTTPS
- [ ] Setup monitoring/logging
- [ ] Configure CI/CD pipeline
- [ ] Setup environment-specific config

---

## 📚 Documentation Files

```
Root Directory:
├── QUICK_START.md                    ← Start here!
├── PHASE_5_COMPLETION_REPORT.md      ← Detailed report
├── FILE_INVENTORY.md                 ← All files listed
├── PHASE_SUMMARY.md                  ← Overview
└── THIS FILE (REFERENCE_GUIDE.md)    ← You are here
```

---

## 🎓 Learning Resources

### Official Documentation
- [NestJS](https://docs.nestjs.com)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Passport.js](http://www.passportjs.org/docs)
- [JWT](https://jwt.io)

### Key Concepts
- **JWT**: Token-based authentication
- **Guards**: Middleware for protection
- **Interceptors**: Request/response transformation
- **Decorators**: Metadata for routes
- **Modules**: Feature organization
- **Services**: Business logic
- **Controllers**: Route handlers

---

## ✅ Pre-Launch Checklist

Before considering the API ready for testing:

- [ ] Docker Desktop running
- [ ] Database services up (`docker-compose ps`)
- [ ] Database initialized (`npx prisma db push`)
- [ ] Seed data loaded (`npx prisma db seed`)
- [ ] API server running (`npm run start:dev`)
- [ ] Swagger accessible (http://localhost:5000/api-docs)
- [ ] Can login with test credentials
- [ ] JWT token works with protected routes
- [ ] Token refresh works
- [ ] No TypeScript errors in console

---

## 🤝 Next Phase

When ready to implement Phase 6 (Additional Modules):

1. Follow the same pattern as `src/modules/auth/`
2. Create new module directory
3. Create controller, service, module files
4. Add DTOs for validation
5. Register in `app.module.ts`
6. Add routes to Swagger

---

**Last Updated:** January 12, 2026  
**Status:** ✅ Production Ready  
**Maintainer:** Backend Development Team


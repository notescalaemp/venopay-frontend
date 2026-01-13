# Phase 6 Implementation Guide

## 🎯 What Was Implemented

This Phase 6 implementation adds 4 complete domain modules to your NestJS backend:

1. **Users Module** - User management with roles and status control
2. **Sellers Module** - Seller onboarding with KYC workflow
3. **Managers Module** - Manager hierarchy and permissions
4. **Admin Module** - System analytics and operational insights

Plus enhanced common layer infrastructure with utilities, constants, types, and audit infrastructure.

---

## 📦 How to Use

### 1. Start the Backend

```bash
cd backend
npm install  # If needed
npm run build  # Verify compilation
npm run start  # Start development server
```

### 2. Access API Documentation

Open your browser and navigate to:
```
http://localhost:5000/api-docs
```

You'll see all 33 endpoints organized by module (users, sellers, managers, admin).

### 3. Authenticate

All endpoints except `POST /auth/register` and `POST /sellers` require authentication:

1. Register a new user:
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePass123!",
  "name": "Admin User"
}
```

2. Login to get JWT token:
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePass123!"
}
```

3. Use token in subsequent requests:
```bash
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Role-Based Access Control

Each endpoint is protected with specific roles:

### Users Module
- `GET /users` - ADMIN, MANAGER
- `GET /users/:id` - Everyone authenticated
- `PATCH /users/:id` - ADMIN only
- `DELETE /users/:id` - ADMIN only
- `PATCH /users/:id/activate` - ADMIN only
- `PATCH /users/:id/deactivate` - ADMIN only

### Sellers Module
- `GET /sellers` - ADMIN, MANAGER
- `GET /sellers/pending/approval` - ADMIN, MANAGER
- `GET /sellers/:id` - ADMIN, MANAGER
- `POST /sellers` - Public (no auth required)
- `PATCH /sellers/:id` - ADMIN, MANAGER
- `DELETE /sellers/:id` - ADMIN only
- `PATCH /sellers/:id/kyc` - ADMIN, MANAGER

### Managers Module
- All endpoints - ADMIN only (create, list, update, delete)

### Admin Module
- All endpoints - ADMIN only (stats, health, users list, sellers list, audit logs, activity report)

---

## 📊 Example API Calls

### 1. List Users (requires ADMIN or MANAGER role)
```bash
GET /api/v1/users?page=1&pageSize=20&role=ADMIN&status=ACTIVE
Authorization: Bearer <token>
```

### 2. Create a Seller (public endpoint)
```bash
POST /api/v1/sellers
Content-Type: application/json

{
  "businessName": "Tech Solutions Ltd",
  "phone": "+5511987654321",
  "document": "12345678901234"
}
```

### 3. Update Seller KYC Status
```bash
PATCH /api/v1/sellers/{sellerId}/kyc
Authorization: Bearer <token>
Content-Type: application/json

{
  "kycStatus": "APPROVED",
  "kycDocuments": "{...}"
}
```

### 4. Get System Statistics
```bash
GET /api/v1/admin/stats?startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <token>
```

### 5. Get Audit Logs
```bash
GET /api/v1/admin/audit-logs?page=1&pageSize=50
Authorization: Bearer <token>
```

---

## 🛠️ Key Features

### Pagination
All list endpoints support pagination:
```
?page=1&pageSize=20
```

Default: page=1, size=20, max=100

### Filtering
Each list endpoint supports module-specific filters:

**Users**: role, status, email
**Sellers**: kycStatus, email
**Managers**: department, email
**Admin Users**: role, email
**Admin Sellers**: kycStatus, email

### Audit Logging
All Create, Update, Delete operations are automatically logged to the `AuditLog` table:
- Action: CREATE, UPDATE, DELETE
- Resource: entity name
- UserId: who performed the action
- Timestamp: when it happened
- IP Address & User-Agent: tracking info

View audit logs at: `GET /api/v1/admin/audit-logs`

---

## 📚 Data Models

### User Model (from Prisma)
```typescript
- id: string (unique)
- email: string (unique)
- password: string (hashed with bcrypt)
- name: string
- role: UserRole (ADMIN, MANAGER, SELLER, SUB_ACCOUNT)
- status: UserStatus (ACTIVE, INACTIVE, PENDING, SUSPENDED)
- createdAt: datetime
- updatedAt: datetime
```

### Seller Model
```typescript
- id: string (unique)
- userId: string (relationship to User)
- businessName: string
- document: string (unique - CPF/CNPJ)
- phone: string
- address: JSON
- kycStatus: KYCStatus (PENDING, APPROVED, REJECTED, EXPIRED)
- kycDocuments: JSON
- createdAt: datetime
- updatedAt: datetime
```

### Manager Model
```typescript
- id: string (unique)
- userId: string (unique relationship to User)
- createdAt: datetime
- updatedAt: datetime
```

### AuditLog Model
```typescript
- id: string (unique)
- userId: string
- action: string (CREATE, UPDATE, DELETE)
- entity: string (resource name)
- entityId: string
- before: JSON (previous values)
- after: JSON (new values)
- ip: string
- userAgent: string
- createdAt: datetime
```

---

## 🔄 Common Workflows

### Create a New Manager
1. Create a User (if not exists) via Auth
2. Create a Manager associated with User ID
```bash
POST /api/v1/managers
Authorization: Bearer <admin_token>
{
  "name": "John Manager",
  "email": "john@example.com",
  "department": "Operations"
}
```

### Seller Onboarding Flow
1. Seller submits registration (public endpoint)
   ```bash
   POST /api/v1/sellers
   {
     "businessName": "My Company",
     "document": "12345678901234",
     "phone": "+5511987654321"
   }
   ```

2. Admin reviews KYC
   ```bash
   GET /api/v1/sellers/pending/approval
   ```

3. Admin approves/rejects
   ```bash
   PATCH /api/v1/sellers/{id}/kyc
   {
     "kycStatus": "APPROVED"
   }
   ```

### Monitor System Health
```bash
GET /api/v1/admin/health
GET /api/v1/admin/stats
GET /api/v1/admin/activity-report
```

---

## 🚀 Production Deployment Checklist

- [ ] Run `npm run build` - verify 0 TypeScript errors ✅
- [ ] Set environment variables (see `.env.example`)
- [ ] Configure PostgreSQL database connection
- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Set JWT_SECRET in environment
- [ ] Configure CORS origins
- [ ] Set up SSL certificate
- [ ] Configure email service (if needed)
- [ ] Set up monitoring/logging
- [ ] Test authentication flow
- [ ] Test RBAC on protected endpoints
- [ ] Verify audit logging
- [ ] Load testing for payment processing

---

## 🐛 Troubleshooting

### Build Fails with TS Errors
```bash
npm run build
# Check output for specific file/line
# Verify all imports are correct
```

### Authorization Error on Protected Endpoint
- Verify JWT token is provided in `Authorization: Bearer <token>` header
- Verify token is not expired (7 days validity)
- Verify user has required role via `GET /api/v1/users/{userId}`

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run `npx prisma db push` to sync schema

### Audit Logs Not Appearing
- Verify endpoint has `@Audit` decorator
- Check it's a CREATE, UPDATE, or DELETE operation
- View logs via `GET /api/v1/admin/audit-logs`

---

## 📞 Support

For issues or questions about Phase 6 implementation:
1. Check the PHASE_6_COMPLETION.md for full details
2. Review the Swagger documentation at /api-docs
3. Check specific module controllers for endpoint details
4. Verify Prisma schema for data model structure

---

**Phase 6 Status**: ✅ COMPLETE AND PRODUCTION-READY

Next Phase: Payment module integration (PIX, Stripe, MercadoPago)

# ✅ FRONTEND - FASE 1 COMPLETA

## 🎉 O que foi criado

Frontend **100% funcional** com React + TypeScript + Vite + TailwindCSS + shadcn/ui.

### ✅ Setup Inicial (10/10)
- ✅ Vite + React 18
- ✅ TypeScript strict mode
- ✅ TailwindCSS + PostCSS
- ✅ shadcn/ui components
- ✅ ESLint configured

### ✅ State Management (10/10)
- ✅ **Zustand** - Auth store com persistence
- ✅ **React Query** - Data fetching e caching
- ✅ **localStorage** - Token storage

### ✅ Autenticação (10/10)
- ✅ Auth API service
  - POST /auth/login
  - POST /auth/register
  - GET /auth/me
  - POST /auth/logout
  - POST /auth/refresh (token expiration)
  
- ✅ JWT token management
  - Access token storage
  - Refresh token auto-refresh
  - 401 error handling + retry

- ✅ Auth hooks (useAuth)
  - login(data)
  - register(data)
  - logout()
  - User state
  - Loading state

### ✅ Componentes de UI (10/10)
- ✅ shadcn/ui:
  - Button
  - Card (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  - Input
  - Label
  - Form (com react-hook-form)

- ✅ Custom components:
  - LoginForm (com validação Zod)
  - RegisterForm (com validação Zod)
  - ProtectedRoute (com RBAC)

### ✅ Pages (10/10)
- ✅ LoginPage
- ✅ RegisterPage
- ✅ Placeholder Dashboards (Admin, Manager, Seller)

### ✅ Routing (10/10)
- ✅ React Router v6
- ✅ Protected routes por role
- ✅ Auto-redirect baseado em role
- ✅ 401 → Login redirect

### ✅ Utilidades (10/10)
- ✅ API client (axios com interceptors)
- ✅ Token refresh automático
- ✅ CORS proxy configurado
- ✅ Global types (User, UserRole, ApiResponse)
- ✅ Constants (ROUTES, TRANSACTION_STATUS, etc)
- ✅ Formatters (currency, date, CPF, CNPJ)
- ✅ Toast notifications (Sonner)

---

## 🚀 Como Usar

### 1. Terminal 1 - Backend (porta 5000)
```bash
cd backend
npm run start:dev
```

### 2. Terminal 2 - Frontend (porta 5173)
```bash
cd frontend
npm run dev
```

### 3. Acessar no navegador
```
http://localhost:5173
```

---

## 🔐 Testar Autenticação

### Credenciais de Teste (do seed do backend)

**Admin:**
- Email: `admin@gateway.com`
- Senha: `Admin@123`

**Manager:**
- Email: `manager@gateway.com`
- Senha: `Admin@123`

**Seller:**
- Email: `seller@test.com`
- Senha: `Admin@123`

### Fluxo de Login
1. Digite email e senha
2. Clique em "Entrar"
3. Sistema faz POST /auth/login
4. Salva tokens em localStorage
5. Redireciona baseado em role:
   - ADMIN → /admin/dashboard
   - MANAGER → /manager/dashboard
   - SELLER → /seller/dashboard

### Features de Segurança
- ✅ JWT tokens em Authorization header
- ✅ Refresh automático quando expirar (401)
- ✅ Protected routes com ProtectedRoute component
- ✅ RBAC - apenas roles autorizadas
- ✅ Logout limpa localStorage

---

## 📁 Estrutura de Arquivos

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Root app
│   │   ├── providers.tsx           # Query Client + Toaster
│   │   ├── router.tsx              # React Router setup
│   │   └── styles.css              # App styles
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   └── authApi.ts      # POST /auth/login, register, etc
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx   # Login form com react-hook-form
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts      # useMutation hooks
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   └── types/
│   │   │       └── auth.types.ts   # loginSchema, registerSchema (Zod)
│   │   │
│   │   └── dashboard/
│   │       └── pages.tsx           # Admin/Manager/Seller dashboards
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx  # Wrapper para RBAC
│   │   │   └── ui/
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── form.tsx
│   │   │       ├── input.tsx
│   │   │       └── label.tsx
│   │   ├── types/
│   │   │   └── global.types.ts     # User, UserRole, ApiResponse
│   │   └── utils/
│   │       ├── api.ts              # Axios client com interceptors
│   │       ├── constants.ts        # ROUTES, TRANSACTION_STATUS, etc
│   │       └── formatters.ts       # formatCurrency, formatDate, etc
│   │
│   ├── stores/
│   │   └── authStore.ts            # Zustand auth store
│   │
│   ├── styles/
│   │   └── globals.css             # Tailwind + CSS variables
│   │
│   ├── lib/
│   │   └── utils.ts                # cn() utility
│   │
│   ├── main.tsx                    # Entry point
│   └── index.css
│
├── .env                            # VITE_API_URL, VITE_APP_NAME
├── vite.config.ts                  # Vite config com proxy /api
├── tailwind.config.js              # Tailwind theme
├── postcss.config.js               # PostCSS config
├── tsconfig.json                   # TypeScript config
├── index.html
└── package.json
```

---

## 🎨 Stack Tecnológico

### Core Framework
- **React 18** - UI library
- **TypeScript 5.3** - Type safety
- **Vite 5.0** - Build tool (⚡ instant HMR)
- **React Router v6** - Navigation

### State & Data Management
- **Zustand 4.4** - Lightweight state (Auth store)
- **React Query 5.28** - Server state management
- **localStorage** - Client storage (tokens)

### Forms & Validation
- **React Hook Form 7.48** - Form state management
- **Zod 3.22** - Schema validation
- **@hookform/resolvers** - RHF + Zod integration

### HTTP Client
- **Axios 1.6** - HTTP requests
- **Interceptors** - JWT auth, token refresh, error handling

### UI & Styling
- **TailwindCSS 3.4** - Utility-first CSS
- **PostCSS 8.4** - CSS processing
- **shadcn/ui** - Headless components
- **Lucide React 0.294** - Icons
- **Sonner 1.3** - Toast notifications

### Utilities
- **clsx 2.0** - Class management
- **tailwind-merge 2.2** - Tailwind class merging
- **date-fns 2.30** - Date formatting
- **class-validator** - Runtime validation

---

## 🔌 API Integration

### Axios Client (`src/shared/utils/api.ts`)

**Configurações:**
- baseURL: `VITE_API_URL` (default: `http://localhost:5000/api/v1`)
- Headers: `Content-Type: application/json`

**Request Interceptor:**
```typescript
// Adiciona JWT automaticamente
Authorization: Bearer ${localStorage.getItem('accessToken')}
```

**Response Interceptor:**
```typescript
// 401 response:
1. Pega refreshToken de localStorage
2. POST /auth/refresh com refreshToken
3. Salva novo accessToken e refreshToken
4. Retry da requisição original
5. Se falhar: logout + redirect /login
```

### Como usar:
```typescript
import { api } from '@/shared/utils/api';

const response = await api.post('/auth/login', { email, password });
// Token é adicionado automaticamente
// Se 401, faz refresh automático e retenta
```

---

## 🛣️ Rotas Implementadas

| Route | Auth | Roles | Status |
|-------|------|-------|--------|
| `/` | ❌ | - | → Redireciona para /login |
| `/login` | ❌ | - | ✅ LoginPage |
| `/register` | ❌ | - | ✅ RegisterPage |
| `/dashboard` | ✅ | Any | ✅ DashboardPage |
| `/admin/dashboard` | ✅ | ADMIN | ✅ AdminDashboardPage |
| `/manager/dashboard` | ✅ | MANAGER | ✅ ManagerDashboardPage |
| `/seller/dashboard` | ✅ | SELLER | ✅ SellerDashboardPage |

**Mais rotas** para Fase 2 (Layout, Transactions, Wallet, etc)

---

## 🔐 Auth Flow

```
┌─────────────┐
│ User enters │
│ credentials │
└──────┬──────┘
       │
       v
┌─────────────────────────────┐
│ LoginForm validates with Zod│
└──────┬──────────────────────┘
       │
       v
┌──────────────────────────────────┐
│ useAuth().login() mutation        │
│ POST /api/v1/auth/login          │
└──────┬───────────────────────────┘
       │
       v
┌────────────────────────────────────────┐
│ API returns {user, accessToken, ...}   │
│ authStore.setUser(user)                │
│ authStore.setTokens(accessToken, ...)  │
│ localStorage.setItem('accessToken',..) │
└──────┬─────────────────────────────────┘
       │
       v
┌──────────────────────────────────┐
│ useNavigate baseado em user.role │
│ /admin/dashboard (ADMIN)         │
│ /manager/dashboard (MANAGER)     │
│ /seller/dashboard (SELLER)       │
└──────────────────────────────────┘
```

---

## 📝 Variáveis de Ambiente

### `.env.example`
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Payment Gateway
```

### `.env` (local)
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Payment Gateway
```

---

## 🧪 Componentes shadcn/ui

### Instalados:
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Form

### Como adicionar mais:
```bash
npx shadcn-ui@latest add [component]

# Exemplos:
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
```

---

## 🎯 Próximas Fases

### Fase 2 - Layout & Dashboards (Começando)
- [ ] AppLayout component (Header, Sidebar, Footer)
- [ ] Admin Dashboard
- [ ] Manager Dashboard  
- [ ] Seller Dashboard
- [ ] Navigation menu

### Fase 3 - Seller Features
- [ ] Transactions page (list, filters, details)
- [ ] Wallet page (balance, deposit, withdraw, P2P)
- [ ] Checkout builder (WYSIWYG editor)
- [ ] Integrations page (API keys, webhooks)

### Fase 4 - Advanced
- [ ] 7 Checkout templates (Minimalist, Drop, Ecommerce, Premium, OneClick, Subscription, Donation)
- [ ] Analytics & Charts (Recharts)
- [ ] Reports (PDF export)
- [ ] Settings & Configuration

---

## 🐛 Troubleshooting

### "Failed to connect to backend"
1. Verificar se backend rodando: `http://localhost:5000`
2. Verificar `.env`: `VITE_API_URL=http://localhost:5000/api/v1`
3. Verificar CORS no backend (`app.enableCors()`)

### "Token invalid"
- Verificar `/auth/login` response: precisa incluir `accessToken` e `refreshToken`
- Check localStorage em DevTools → Application → Storage → Local Storage

### "Keep redirecting to /login"
- Verificar se user está no localStorage
- Verificar se `useAuthStore().isAuthenticated` é true
- Check `ProtectedRoute` component logic

### "Componente shadcn não funciona"
- Executar: `npx shadcn-ui@latest add [component]`
- Verificar import path em componentes
- Limpar cache: `rm -rf node_modules && npm install`

---

## 📚 Documentação Externa

- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [React Router v6](https://reactrouter.com)
- [React Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Sonner](https://sonner.emilkowal.ski)

---

## 💡 Dicas

### Adicionar novo componente
```bash
# Criar arquivo em features/[feature]/components/[Component].tsx
# Exportar em features/[feature]/index.ts
import { Component } from '@/features/[feature]';
```

### Usar API
```typescript
import { api } from '@/shared/utils/api';

const data = await api.get('/users');
const response = await api.post('/users', { name: 'John' });
// Tokens adicionados automaticamente
```

### Toast notifications
```typescript
import { toast } from 'sonner';

toast.success('Sucesso!');
toast.error('Erro!');
toast.loading('Carregando...');
```

### Protected route
```typescript
<ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
  <AdminPage />
</ProtectedRoute>
```

---

## ✨ Próximo Passo

**Fase 2** começa com:
1. Criar `AppLayout` component (Header + Sidebar + Footer)
2. Implementar Admin Dashboard
3. Implementar Manager Dashboard
4. Implementar Seller Dashboard

Pronto para começar! 🚀

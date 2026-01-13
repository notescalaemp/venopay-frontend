# 🎨 Árvore de Componentes - VenoPay Frontend

## Hierarquia de Componentes

```
App
├── RouterProvider
│   └── BrowserRouter
│       ├── Route: /login
│       │   └── LoginPage
│       │       ├── Logo (CreditCard icon + text)
│       │       ├── Form
│       │       │   ├── EmailField
│       │       │   │   └── Icon + Input
│       │       │   ├── PasswordField
│       │       │   │   ├── Icon + Input
│       │       │   │   └── ShowPassword Button
│       │       │   ├── ErrorAlert (Alert component)
│       │       │   └── SubmitButton (Button component)
│       │       └── CredentialsBox
│       │
│       ├── Route: /dashboard
│       │   └── ProtectedRoute
│       │       └── DashboardPage
│       │           ├── Header
│       │           │   ├── Logo
│       │           │   ├── SearchBar
│       │           │   ├── NotificationBell
│       │           │   ├── UserInfo
│       │           │   └── LogoutButton
│       │           │
│       │           └── Layout (flex)
│       │               ├── Sidebar (colapsável)
│       │               │   ├── NavMenu (7 items)
│       │               │   │   ├── Dashboard
│       │               │   │   ├── Transactions
│       │               │   │   ├── Payments
│       │               │   │   ├── Wallet
│       │               │   │   ├── Analytics
│       │               │   │   ├── Users
│       │               │   │   └── Settings
│       │               │   │
│       │               │   └── VersionBox
│       │               │
│       │               └── Main
│       │                   ├── Welcome Section
│       │                   │
│       │                   ├── StatsGrid (4 cards)
│       │                   │   ├── StatCard (Saldo)
│       │                   │   │   ├── Icon + Gradient
│       │                   │   │   └── Value
│       │                   │   ├── StatCard (Transactions)
│       │                   │   ├── StatCard (Users)
│       │                   │   └── StatCard (Sales)
│       │                   │
│       │                   └── RecentTransactions (Card)
│       │                       ├── Header
│       │                       ├── Table
│       │                       │   ├── THead
│       │                       │   └── TBody
│       │                       │       ├── Row 1
│       │                       │       ├── Row 2
│       │                       │       ├── Row 3
│       │                       │       ├── Row 4
│       │                       │       └── Row 5
│       │                       └── ViewMore Link
│       │
│       └── Route: *
│           └── NotFoundPage
│               ├── Icon (AlertTriangle)
│               ├── 404 Text
│               └── BackButton
│
└── Componentes Globais (Reutilizáveis)
    ├── Button
    │   ├── Props: variant, size, disabled, fullWidth
    │   └── Variantes: primary, secondary, danger, outline
    │
    ├── Card
    │   ├── CardHeader
    │   ├── CardBody
    │   └── CardFooter
    │
    └── Alert
        ├── Props: type, title, message
        └── Tipos: success, error, warning, info
```

## Estrutura de Pastas

```
frontend/src/
│
├── api/
│   └── http.ts
│       ├── HttpClient class
│       ├── Axios instance
│       ├── Request interceptor (JWT)
│       ├── Response interceptor (401)
│       └── Methods: get, post, put, delete, patch
│
├── auth/
│   └── useAuth.ts (Hook)
│       ├── User state
│       ├── Login function
│       ├── Logout function
│       ├── isAuthenticated
│       ├── isLoading
│       └── error
│
├── components/
│   ├── Button.tsx
│   │   ├── Prop: variant (primary|secondary|danger|outline)
│   │   ├── Prop: size (sm|md|lg)
│   │   ├── Prop: disabled
│   │   └── Prop: fullWidth
│   │
│   ├── Card.tsx
│   │   ├── Card (main)
│   │   ├── CardHeader (title, description, action)
│   │   ├── CardBody (content)
│   │   └── CardFooter (actions)
│   │
│   ├── Alert.tsx
│   │   ├── Prop: type (success|error|warning|info)
│   │   ├── Prop: title (optional)
│   │   ├── Prop: message
│   │   └── Prop: onClose (optional)
│   │
│   └── index.ts (exports)
│
├── config/
│   └── constants.ts
│       ├── APP_CONFIG
│       ├── API_ENDPOINTS
│       ├── PAYMENT_STATUS
│       └── MESSAGES
│
├── hooks/
│   ├── useNotification.ts (Hook)
│   │   ├── success()
│   │   ├── error()
│   │   ├── warning()
│   │   ├── info()
│   │   ├── loading()
│   │   ├── dismiss()
│   │   └── promise()
│   │
│   └── index.ts (exports)
│
├── pages/
│   ├── Login.tsx
│   │   ├── Form validation
│   │   ├── Email input
│   │   ├── Password input (toggle)
│   │   ├── Error display
│   │   ├── Submit button
│   │   └── Test credentials box
│   │
│   ├── Dashboard.tsx
│   │   ├── Header
│   │   ├── Sidebar
│   │   ├── Main content
│   │   ├── Stats grid
│   │   └── Transactions table
│   │
│   ├── NotFound.tsx
│   │   ├── 404 icon
│   │   ├── Message
│   │   └── Back button
│   │
│   ├── Login.module.css (antigo)
│   └── Dashboard.module.css (antigo)
│
├── routes/
│   ├── index.tsx
│   │   ├── Route /login → LoginPage
│   │   ├── Route /dashboard → ProtectedRoute → DashboardPage
│   │   └── Route * → NotFoundPage
│   │
│   └── ProtectedRoute.tsx
│       ├── Auth check
│       ├── Loading screen
│       ├── Redirect logic
│       └── Children render
│
├── styles/
│   └── global.css
│       ├── Resets
│       ├── Fonts
│       ├── Scrollbar
│       └── Animations
│
├── App.tsx (Router wrapper)
├── App.css (empty)
├── index.css (Tailwind + global)
└── main.tsx (entry point)
```

## Fluxo de Autenticação

```
LoginPage
    ↓
Form Submit
    ↓
useAuth.login()
    ↓
HTTP POST /auth/login
    ↓
Sucesso? Sim ↓ Não →  Error display
    ↓
Save token + user
    ↓
Navigate to /dashboard
    ↓
ProtectedRoute check
    ↓
User authenticated? Sim ↓ Não → Redirect /login
    ↓
DashboardPage render
```

## Fluxo de Dados (State Management)

```
LocalStorage
    ↑ ↓
useAuth Hook
    ↑ ↓
Components
    ↑ ↓
API (http client)
    ↑ ↓
Backend
```

## Estrutura de Cores em Tailwind

```
Colors:
├── primary (Laranja #F97316)
│   ├── 50 a 900 (variações)
│   └── Botões, links, destaques
│
├── dark (Preto #111827)
│   ├── 50 a 900 (tons de cinza)
│   └── Backgrounds, textos escuros
│
└── light (Branco #FFFFFF)
    ├── 50 a 900 (tons brancos)
    └── Cards, foregrounds

Aplicação:
├── bg-primary-500 → Botões (Laranja)
├── bg-dark-900 → Backgrounds (Preto)
├── bg-white → Cards (Branco)
├── text-dark-900 → Textos
├── border-primary-500 → Bordas de foco
└── hover:bg-primary-600 → Interações
```

## Componentes e Suas Props

### Button

```typescript
<Button
  variant="primary"      // primary | secondary | danger | outline
  size="md"              // sm | md | lg
  disabled={false}       // boolean
  fullWidth={false}      // boolean
  onClick={handler}      // function
  type="button"          // button | submit | reset
>
  Texto do Botão
</Button>
```

### Card

```typescript
<Card hoverable={true} className="">
  <CardHeader 
    title="Título"
    description="Descrição"
    action={<Element />}
  />
  <CardBody className="">
    Conteúdo
  </CardBody>
  <CardFooter>
    Rodapé
  </CardFooter>
</Card>
```

### Alert

```typescript
<Alert
  type="success"         // success | error | warning | info
  title="Título"         // optional
  message="Mensagem"
  onClose={handler}      // optional
/>
```

## Hooks e Suas Funções

### useAuth

```typescript
const {
  user,                  // User | null
  isAuthenticated,       // boolean
  isLoading,            // boolean
  error,                // string | null
  login,                // (email, password) => Promise
  logout                // () => void
} = useAuth();
```

### useNotification

```typescript
const {
  success,              // (message) => void
  error,                // (message) => void
  warning,              // (message) => void
  info,                 // (message) => void
  loading,              // (message) => id
  dismiss,              // (id) => void
  promise               // (promise, messages) => void
} = useNotification();
```

## Padrões Usados

### 1. Composition Pattern
- Componentes pequenos e reutilizáveis
- Card com Header, Body, Footer separados

### 2. Hook Pattern
- useAuth para autenticação
- useNotification para toasts

### 3. Guard Pattern
- ProtectedRoute para rotas seguras

### 4. Interceptor Pattern
- Axios interceptors para JWT e erros 401

### 5. Context-like Pattern
- localStorage como pseudo-context

---

**Versão**: 1.0.0  
**Data**: 12 de Janeiro de 2024

# 🎨 Guia de Customização - VenoPay Frontend

## Como Customizar as Cores

### 1. Alterar Paleta de Cores Principal

**Arquivo**: `tailwind.config.js`

```javascript
// Mudar de Laranja para outra cor (ex: Azul)
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // Azul ao invés de Laranja
    600: '#2563eb',
  },
  // ...
}
```

### 2. Cores Disponíveis

**Preto** → Use `bg-dark-*`, `text-dark-*`, `border-dark-*`  
**Branco** → Use `bg-white`, `text-white`  
**Laranja** → Use `bg-primary-*`, `text-primary-*`  

```css
/* Exemplos */
bg-primary-500      /* Laranja puro */
bg-dark-900         /* Preto puro */
bg-dark-200         /* Cinza claro */
text-primary-500    /* Texto laranja */
```

## Como Customizar Componentes

### 1. Button

**Arquivo**: `src/components/Button.tsx`

```typescript
// Adicionar nova variante
const variantClasses = {
  // ... existing
  custom: 'bg-custom-500 hover:bg-custom-600 text-white',
};

// Usar
<Button variant="custom">Custom Button</Button>
```

### 2. Card

**Arquivo**: `src/components/Card.tsx`

```typescript
// Adicionar estilos customizados
<Card className="p-8 bg-gradient-to-r from-primary-500 to-primary-600">
  {children}
</Card>
```

### 3. Alert

**Arquivo**: `src/components/Alert.tsx`

```typescript
// Criar novo tipo
const alertConfig = {
  // ... existing
  custom: {
    icon: CustomIcon,
    bg: 'bg-custom-50',
    border: 'border-custom-200',
    title: 'text-custom-900',
    text: 'text-custom-700',
  },
};
```

## Como Customizar Pages

### 1. Adicionar Novo Menu Item

**Arquivo**: `src/pages/Dashboard.tsx`

```typescript
const menuItems = [
  // ... existing
  { id: 'new-section', label: 'Nova Seção', icon: NewIcon },
];
```

### 2. Adicionar Nova Card de Estatística

**Arquivo**: `src/pages/Dashboard.tsx`

```typescript
const stats = [
  // ... existing
  {
    title: 'Novo Stat',
    value: 'R$ 0,00',
    icon: NewIcon,
    color: 'from-primary-500 to-primary-600',
  },
];
```

## Como Configurar API

### 1. Mudar URL da API

**Arquivo**: `.env`

```dotenv
# Alterar para sua URL
VITE_API_URL=http://seu-dominio.com/api
```

### 2. Adicionar Novos Endpoints

**Arquivo**: `src/config/constants.ts`

```typescript
export const API_ENDPOINTS = {
  // ... existing
  NEW_FEATURE: {
    LIST: '/novo-feature',
    CREATE: '/novo-feature',
    DETAIL: (id: string) => `/novo-feature/${id}`,
  },
};
```

### 3. Usar em Componentes

```typescript
import { http } from '../api/http';
import { API_ENDPOINTS } from '../config/constants';

const data = await http.get(API_ENDPOINTS.NEW_FEATURE.LIST);
```

## Como Adicionar Novas Páginas

### 1. Criar Página

**Arquivo**: `src/pages/NewPage.tsx`

```typescript
import { useAuth } from '../auth/useAuth';

export function NewPage() {
  const { user } = useAuth();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-dark-900">Nova Página</h1>
      {/* Conteúdo */}
    </div>
  );
}
```

### 2. Adicionar Rota

**Arquivo**: `src/routes/index.tsx`

```typescript
import { NewPage } from '../pages/NewPage';

export const router = createBrowserRouter([
  // ... existing
  {
    path: '/new-page',
    element: (
      <ProtectedRoute>
        <NewPage />
      </ProtectedRoute>
    ),
  },
]);
```

### 3. Adicionar Menu Item

**Arquivo**: `src/pages/Dashboard.tsx`

```typescript
const menuItems = [
  // ... existing
  { id: 'new-page', label: 'Nova Página', icon: NewIcon },
];

// No renderização
{activeTab === 'new-page' && (
  <NewPage />
)}
```

## Como Customizar Autenticação

### 1. Adicionar Campo ao Usuário

**Arquivo**: `src/auth/useAuth.ts`

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'SELLER' | 'SUB_ACCOUNT';
  // Adicionar novo campo
  phone?: string;
}
```

### 2. Adicionar Validação

**Arquivo**: `src/api/http.ts`

```typescript
// No interceptor de request
this.instance.interceptors.request.use(
  (config) => {
    // Adicionar validação customizada
    const token = localStorage.getItem('accessToken');
    if (token && !isTokenValid(token)) {
      // Refresh token
    }
    return config;
  }
);
```

## Como Integrar com Backend

### 1. Criar Novo Hook

**Arquivo**: `src/hooks/useTransactions.ts`

```typescript
import { http } from '../api/http';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await http.get('/transactions');
      setTransactions(response.data);
    } finally {
      setLoading(false);
    }
  };

  return { transactions, loading, fetchTransactions };
}
```

### 2. Usar em Componente

```typescript
import { useTransactions } from '../hooks/useTransactions';

export function TransactionsPage() {
  const { transactions, loading } = useTransactions();

  return (
    <div>
      {loading ? <Loader /> : <TransactionsList data={transactions} />}
    </div>
  );
}
```

## Como Adicionar Notificações

```typescript
import { useNotification } from '../hooks/useNotification';

export function MyComponent() {
  const { success, error } = useNotification();

  const handleAction = async () => {
    try {
      await doSomething();
      success('Ação realizada com sucesso!');
    } catch (err) {
      error('Erro ao realizar ação');
    }
  };

  return <button onClick={handleAction}>Ação</button>;
}
```

## Como Testar Localmente

### 1. Modo Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 2. Build Local

```bash
npm run build
npm run preview
```

Acesse: `http://localhost:4173`

## Como Deploy

### 1. Build

```bash
npm run build
```

### 2. Copiar `dist/` para seu servidor

```bash
# Nginx / Apache
cp -r dist/* /var/www/html/

# Vercel
vercel --prod

# GitHub Pages
npm run build
git add dist/
git commit -m "Deploy"
git push
```

## Variáveis de Ambiente

**Arquivo**: `.env`

```dotenv
# API
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Payment Gateway

# Desenvolvimento (adicionar conforme necessário)
VITE_DEBUG=false
VITE_LOG_LEVEL=info
```

## Troubleshooting de Customização

### Problema: Cores não estão sendo aplicadas

**Solução**:
```bash
npm run build  # Rebuild
# ou
touch src/index.css  # Force reload
```

### Problema: Componentes não atualizam

**Solução**: Limpar cache
```bash
rm -rf node_modules
npm install
npm run dev
```

### Problema: Build falha

**Solução**: Verificar erros
```bash
npm run build  # Ver erros completos
```

## Padrões de Código

### Importações

```typescript
// ✅ Correto
import { Button } from '../components';
import { useAuth } from '../auth/useAuth';
import { API_ENDPOINTS } from '../config/constants';

// ❌ Evitar
import Button from '../components/Button.tsx';
```

### Nomes

```typescript
// ✅ Correto
const handleSubmit = () => {}
const isLoading = true
const userData = {}

// ❌ Evitar
const submit = () => {}
const loading = true
const data = {}
```

### Styles

```typescript
// ✅ Correto - Tailwind
<div className="p-4 bg-primary-500 rounded-lg">

// ❌ Evitar - Inline
<div style={{ padding: '16px', backgroundColor: '#f97316' }}>
```

## Performance

### Otimizações Implementadas

✅ Code splitting (Vite)  
✅ CSS minificado  
✅ JS minificado  
✅ Lazy loading ready  
✅ Tree shaking  

### Para melhorar mais

- Adicionar React.memo em componentes pesados
- Usar useCallback para funções
- Implementar virtual scrolling em tabelas grandes

---

**Versão**: 1.0.0  
**Data**: 12 de Janeiro de 2024

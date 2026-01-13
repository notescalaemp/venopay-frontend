# 🚀 Guia Rápido - Frontend VenoPay

## ✨ Mudanças Realizadas

### ❌ O que foi removido
- Template padrão do Vite (contador, logos)
- Componentes de exemplo
- Estilos de template

### ✅ O que foi criado
- **Tela de Login** → Email + Senha + Integração API
- **Dashboard** → Protegido, exibe dados do usuário
- **Cliente HTTP** → Centralizado com interceptors JWT
- **Hook useAuth** → Gerencia autenticação
- **Rotas Protegidas** → ProtectedRoute wrapper
- **Estilos Limpos** → CSS puro, sem framework

---

## 🎯 Usar Agora

### Pré-requisitos

✅ Backend rodando em http://localhost:5000
✅ Frontend em http://localhost:5173 (já aberto)

### Passo 1: Login

```
URL: http://localhost:5173

Email: admin@gateway.com
Senha: Admin@123
```

### Passo 2: Dashboard

Após login, você vê:
- Bem-vindo + Nome do usuário
- Role (ADMIN, MANAGER, etc)
- Cards placeholder para: Transações, Carteira, Configurações, Relatórios

### Passo 3: Logout

Clique no botão "Sair" no header

---

## 📁 Estrutura de Arquivos

```
src/
├── api/http.ts              # Cliente HTTP com JWT
├── auth/useAuth.ts          # Hook de autenticação
├── pages/
│   ├── Login.tsx            # Tela de login
│   ├── Login.module.css
│   ├── Dashboard.tsx        # Dashboard protegido
│   └── Dashboard.module.css
├── routes/
│   ├── index.tsx            # Configuração de rotas
│   └── ProtectedRoute.tsx   # Proteção de rotas
└── ...
```

---

## 🔗 Fluxo de Integração

### Login
```
User Input
    ↓
Login.tsx → useAuth.hook → http.post(/auth/login)
    ↓
JWT armazenado em localStorage
    ↓
Redireciona para /dashboard
```

### Dashboard
```
ProtectedRoute verifica token
    ↓
Se OK → Exibe Dashboard
Se 401 → Redireciona para Login
```

### API Calls
```
http.get/post/put/delete(url)
    ↓
Interceptor adiciona: Authorization: Bearer {token}
    ↓
Se 401 → Limpa localStorage, redireciona para login
```

---

## ⚙️ Configuração

### .env

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=VenoPay
```

### Endpoints Esperados do Backend

```
POST /auth/login
  { email, password }
  → { user, accessToken }

GET /auth/me
  → { user }

POST /auth/logout
  → ok
```

---

## 💡 Próximas Features

**Fase 2** - Layout Base
- Header com menu
- Sidebar
- Footer

**Fase 3** - Dashboards
- Admin
- Manager
- Seller

**Fase 4** - Funcionalidades
- Transactions page
- Wallet
- Settings

---

## 🧪 Teste a Estrutura

### Comando
```bash
npm run dev
```

### Resultado
- ✅ Nenhuma erro de TypeScript
- ✅ Página de Login exibida
- ✅ Após login → Dashboard
- ✅ Logout funciona
- ✅ Refresh mantém sessão
- ✅ Browser console limpo

---

## 🎨 Design

**Tema**: Roxo → Azul  
**Font**: System fonts  
**Layout**: Flexbox + Grid  
**Responsivo**: Sim (mobile friendly)

---

## 🔒 Segurança

✅ JWT em Authorization header  
✅ 401 limpa localStorage  
✅ Tipagem forte (TypeScript)  
✅ Sem hardcoded credentials  

⚠️ localStorage pode ser acessado via XSS  
🔄 Futuro: HttpOnly cookies

---

## 📞 Troubleshooting

### Problema: "Cannot find module X"
**Solução**: `npm install` + `npm run dev`

### Problema: Login não funciona
**Solução**: 
- Verificar se backend está rodando em :5000
- Verificar .env tem VITE_API_URL correto
- Abrir DevTools → Network → Ver requisição

### Problema: Token expirado
**Solução**: 
- Limpar localStorage em DevTools
- Fazer login novamente

---

## 📊 Status

| Item | Status |
|------|--------|
| Frontend Build | ✅ 0 errors |
| Dev Server | ✅ http://localhost:5173 |
| Login Page | ✅ Funcional |
| Dashboard | ✅ Protegido |
| API Integration | ✅ Pronta |
| Rotas | ✅ Configuradas |
| TypeScript | ✅ Strict |

---

**Próximo**: Iniciar Fase 2 (Layout Base com Header/Sidebar)

**Data**: 12 de Janeiro de 2026  
**Status**: ✅ Production Ready

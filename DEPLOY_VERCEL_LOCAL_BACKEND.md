# 🚀 Deploy Frontend no Vercel + Backend Local

## 📋 Pré-requisitos

- Node.js 18+
- Git e conta GitHub
- Conta Vercel (gratuita)
- Backend rodando localmente

---

## 1️⃣ Preparar o Frontend para Deploy

### A. Atualizar variáveis de ambiente

**Arquivo**: `frontend/.env`

```dotenv
# Para desenvolvimento local (backend local)
VITE_API_URL=http://localhost:5000/api/v1

# Para produção (backend local - será usado após deploy)
# Use um domínio fixo ou IP da sua máquina
```

**Arquivo**: `frontend/.env.production`

```dotenv
# Produção - Backend local (substitua pelo seu IP/domínio)
VITE_API_URL=http://seu-ip-local:5000/api/v1
# Ou se tiver domínio:
# VITE_API_URL=https://seu-dominio.com/api/v1
```

### B. Criar arquivo vercel.json

**Arquivo**: `frontend/vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite-api-url"
  },
  "envPrefix": "VITE_"
}
```

### C. Atualizar CORS no Backend

**Arquivo**: `backend/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para desenvolvimento e produção
  app.enableCors({
    origin: [
      'http://localhost:5173', // Dev local
      'http://localhost:3000', // Dev local
      'https://seu-frontend.vercel.app', // Vercel (após deploy)
      'http://seu-ip-local:3000', // IP local da máquina
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(5000, '0.0.0.0'); // Ouve em todos os IPs
  console.log(`Backend rodando em http://localhost:5000`);
}

bootstrap();
```

---

## 2️⃣ Verificar Database

### Verificar se o Database está rodando

```bash
cd database

# Ver status do Prisma
npx prisma studio

# Ou resetar se necessário
npm run db:reset

# Ou migrar
npm run db:migrate

# Ou seedar
npm run db:seed
```

### Arquivo schema.prisma

**Arquivo**: `database/prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql" // Ou seu banco
  url      = env("DATABASE_URL")
}

// Modelos...
```

### Verificar .env do Database

**Arquivo**: `database/.env`

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/venopay"
# Ou outro banco de dados
```

---

## 3️⃣ Deploy no Vercel

### Passo 1: Fazer Push no GitHub

```bash
# No diretório do frontend
cd frontend
git init
git add .
git commit -m "Initial commit - VenoPay Frontend"
git branch -M main
git remote add origin https://github.com/seu-usuario/venopay-frontend.git
git push -u origin main
```

### Passo 2: Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Cole a URL do seu repositório
5. Clique em "Import"

### Passo 3: Configurar Environment Variables

No dashboard do Vercel:

1. Vá para "Settings" → "Environment Variables"
2. Adicione:

```
VITE_API_URL = http://seu-ip-local:5000/api/v1
```

Ou se usar domínio fixo:
```
VITE_API_URL = https://seu-dominio.com:5000/api/v1
```

### Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde ~2 minutos
3. Copie a URL do Vercel (ex: `venopay.vercel.app`)

---

## 4️⃣ Rodar Backend Localmente

### Instalação

```bash
cd backend

# Instalar dependências
npm install

# Gerar Prisma
npm run prisma:generate
```

### Iniciar Backend

```bash
# Desenvolvimento (com watch)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

Deve exibir:
```
[NestFactory] Starting Nest application...
[InstanceLoader] TypeOrmModule dependencies initialized...
Backend rodando em http://localhost:5000
```

---

## 5️⃣ Exposer Backend Localmente (Ngrok)

Se quiser acessar o backend de fora:

### Instalar Ngrok

```bash
# Windows
choco install ngrok
# Ou baixar em https://ngrok.com/download

# macOS
brew install ngrok

# Linux
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
```

### Usar Ngrok

```bash
# Criar túnel para porta 5000
ngrok http 5000

# Verá algo como:
# Forwarding https://abc123.ngrok.io -> http://localhost:5000
```

### Atualizar VITE_API_URL no Vercel

```
VITE_API_URL = https://abc123.ngrok.io/api/v1
```

---

## 6️⃣ Testar Integração

### 1. Backend rodando localmente

```bash
cd backend
npm run start:dev
```

Deve estar em: `http://localhost:5000`

### 2. Frontend em desenvolvimento

```bash
cd frontend
npm run dev
```

Acesse: `http://localhost:5173`

### 3. Testar Login

- Email: `admin@gateway.com`
- Senha: `Admin@123`

### 4. Verificar no Frontend Vercel

- Acesse: `https://seu-projeto.vercel.app`
- O API_URL apontará para seu backend local

---

## 🔧 Troubleshooting

### Erro: "CORS blocked"

**Solução**: Atualizar CORS no `backend/src/main.ts`

```typescript
app.enableCors({
  origin: ['https://seu-projeto.vercel.app'],
  credentials: true,
});
```

### Erro: "Connection refused"

**Problema**: Backend não está rodando  
**Solução**: 
```bash
cd backend
npm run start:dev
```

### Erro: "API_URL é http://localhost:5000"

**Problema**: Variável de ambiente não está carregando  
**Solução**: Rebu ildar no Vercel após atualizar variáveis

### Frontend tá lento

**Solução**: Use Ngrok para acessar backend mais rapidamente:
```bash
ngrok http 5000
```

---

## 📊 Status da Stack

```
┌─────────────────────────────────────┐
│        FRONTEND (Vercel)            │
│   https://seu-projeto.vercel.app    │
├─────────────────────────────────────┤
│   ↓ VITE_API_URL (variável)  ↓     │
├─────────────────────────────────────┤
│       BACKEND (Local)               │
│    http://localhost:5000            │
├─────────────────────────────────────┤
│       DATABASE (Local)              │
│    PostgreSQL / SQLite              │
└─────────────────────────────────────┘
```

---

## 🚀 Próximos Passos

1. ✅ Verificar database rodando
2. ✅ Rodar backend localmente
3. ✅ Fazer push no GitHub
4. ✅ Deploy no Vercel
5. ✅ Configurar variáveis de ambiente
6. ✅ Testar integração

---

## 📚 Links Úteis

- Vercel: https://vercel.com
- GitHub: https://github.com
- Ngrok: https://ngrok.com
- NestJS: https://nestjs.com
- Prisma: https://prisma.io

---

**Versão**: 1.0.0  
**Data**: 12 de Janeiro de 2024

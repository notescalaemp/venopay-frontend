# ✅ Setup Rápido - Deploy Vercel + Backend Local + Database

## 🎯 Resumo

```
✅ Frontend: Deploy no Vercel
✅ Backend: Rodando local (localhost:5000)
✅ Database: PostgreSQL em Docker
```

---

## 1️⃣ DATABASE (PostgreSQL em Docker)

### Iniciar Database

```bash
cd database
docker-compose up -d
```

**Verifica se está rodando:**
```bash
docker ps
# Deve mostrar containers do PostgreSQL e Redis
```

**Conectar ao banco:**
```bash
npm run db:studio
# Abre interface visual do Prisma
```

**Status:**
- Host: `localhost`
- Porta: `5432`
- User: `postgres`
- Password: `postgres123`
- Database: `payment_gateway`

---

## 2️⃣ BACKEND (Node.js Local)

### Instalar e Rodar

```bash
cd backend

# 1. Instalar dependências
npm install

# 2. Gerar Prisma
npm run prisma:generate

# 3. Iniciar desenvolvimento
npm run start:dev
```

**Deve aparecer:**
```
[NestFactory] Starting Nest application...
Backend rodando em http://localhost:5000
```

**Endpoints disponíveis:**
- Login: `POST /api/v1/auth/login`
- Usuários: `GET /api/v1/users`
- Transações: `GET /api/v1/transactions`

---

## 3️⃣ FRONTEND (Vercel)

### Preparar para Deploy

**1. Atualizar arquivo** `frontend/vercel.json`:

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

**2. Atualizar** `frontend/.env.production`:

```dotenv
VITE_API_URL=http://seu-ip-local:5000/api/v1
```

Ou com Ngrok (mais fácil):
```dotenv
VITE_API_URL=https://abc123.ngrok.io/api/v1
```

**3. Fazer push no GitHub:**

```bash
cd frontend

git init
git add .
git commit -m "Deploy VenoPay Frontend"
git branch -M main
git remote add origin https://github.com/seu-usuario/venopay-frontend.git
git push -u origin main
```

**4. Deploy no Vercel:**

1. Acesse [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Conecte seu repositório GitHub
4. Em "Environment Variables", adicione:
   ```
   VITE_API_URL = https://seu-ngrok-url/api/v1
   ```
5. Clique "Deploy"

---

## 4️⃣ EXPOR BACKEND COM NGROK (Recomendado)

### Por que?
Assim o frontend no Vercel consegue acessar seu backend local sem problemas de CORS/IP.

### Instalar Ngrok

```bash
# Windows
choco install ngrok

# macOS
brew install ngrok

# Linux
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
```

### Usar Ngrok

```bash
# Terminal separado, enquanto backend está rodando
ngrok http 5000

# Verá algo como:
# Forwarding https://abc123.ngrok.io -> http://localhost:5000
```

### Atualizar Vercel

1. Copie a URL do Ngrok
2. Vá para Vercel → Settings → Environment Variables
3. Atualize `VITE_API_URL`:
   ```
   VITE_API_URL=https://abc123.ngrok.io/api/v1
   ```
4. Redeploye

---

## 5️⃣ FLUXO COMPLETO

### Terminal 1: Database
```bash
cd database
docker-compose up -d
# Roda em background
```

### Terminal 2: Backend
```bash
cd backend
npm run start:dev
# Rodando em http://localhost:5000
```

### Terminal 3: Ngrok (Opcional mas recomendado)
```bash
ngrok http 5000
# Expõe backend para https://abc123.ngrok.io
```

### Terminal 4: Frontend Local (Teste)
```bash
cd frontend
npm run dev
# Rodando em http://localhost:5173
# Acessa backend em http://localhost:5000
```

### Dashboard Vercel
```
Frontend: https://seu-projeto.vercel.app
↓
Acessa: https://abc123.ngrok.io/api/v1
↓
Backend: http://localhost:5000
↓
Database: postgresql://localhost:5432
```

---

## 🧪 TESTAR INTEGRAÇÃO

### 1. Backend respondendo?
```bash
curl http://localhost:5000/health
# Deve retornar 200 OK
```

### 2. Database conectado?
```bash
npm run db:studio
# Abre interface do Prisma
```

### 3. Frontend consegue fazer login?

**Local:**
```
URL: http://localhost:5173
Email: admin@gateway.com
Senha: Admin@123
```

**Vercel:**
```
URL: https://seu-projeto.vercel.app
Email: admin@gateway.com
Senha: Admin@123
```

---

## ⚠️ PROBLEMAS COMUNS

| Problema | Solução |
|----------|---------|
| CORS error | Atualizar CORS no `backend/src/main.ts` |
| Backend não conecta BD | Verificar Docker: `docker ps` |
| Ngrok expira | Regenerar URL e atualizar Vercel |
| Frontend não carrega API | Verificar `VITE_API_URL` no Vercel |
| 401 Unauthorized | Limpar localStorage no navegador |

---

## 📝 CHECKLIST

- [ ] Docker iniciado: `docker-compose up -d`
- [ ] Backend rodando: `npm run start:dev`
- [ ] Ngrok exposing: `ngrok http 5000`
- [ ] GitHub repository criado
- [ ] Vercel projeto conectado
- [ ] Environment variables configuradas
- [ ] Deploy completado
- [ ] Frontend no Vercel testado
- [ ] Login funcionando
- [ ] Database acessível

---

## 🎉 Pronto!

Seu stack está completo:
```
🌐 Frontend Vercel → 🔗 Ngrok Tunnel → 💻 Backend Local → 🗄️ Database Docker
```

---

## 🔗 Links

- Vercel: https://vercel.com
- Ngrok: https://ngrok.com
- Docker: https://docker.com
- GitHub: https://github.com

---

**Sucesso!** 🚀

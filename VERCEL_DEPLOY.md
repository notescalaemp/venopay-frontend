# 🚀 Deploy no Vercel - Passo a Passo

## ✅ Frontend está no GitHub!

```
Repository: https://github.com/notescalaemp/venopay-frontend
Branch: main
Status: ✅ PRONTO PARA VERCEL
```

---

## 🔗 Conectar ao Vercel

### Passo 1: Acessar Vercel

1. Acesse https://vercel.com
2. Clique "Sign in"
3. Selecione "Continue with GitHub"
4. Autorize a conexão

### Passo 2: Criar New Project

1. No dashboard, clique "Add New" → "Project"
2. Clique "Import Git Repository"
3. Procure por `venopay-frontend`
4. Clique "Import"

### Passo 3: Configurar Variáveis de Ambiente

Vercel abrirá a tela de configuração:

1. Em "Environment Variables", adicione:

```
VITE_API_URL = https://abc123.ngrok.io/api/v1
```

(Substitua `abc123.ngrok.io` pela URL do seu Ngrok)

2. Clique "Deploy"

### Passo 4: Aguardar Deploy

- Vercel vai compilar o projeto
- Deve levar ~1-2 minutos
- Verá um checkmark ✅ quando terminar

---

## 🎯 Após Deploy

### URL do seu frontend:

```
https://venopay-frontend.vercel.app
```

(Ou algo similar, Vercel cria automaticamente)

### Testar integração:

1. Acesse a URL
2. Faça login com:
   - Email: `admin@gateway.com`
   - Senha: `Admin@123`
3. Verifique se consegue carregar dados

---

## 🔧 Troubleshooting

### ❌ "Network Error" no login

**Problema**: Frontend não consegue conectar ao backend

**Solução**: 
- Verifique se Ngrok está rodando
- Confira se `VITE_API_URL` está correto no Vercel
- Regenere o build do Vercel

### ❌ "CORS Error"

**Problema**: Backend não autoriza requisições do Vercel

**Solução**:
- Atualize CORS em `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'https://venopay-frontend.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
});
```

### ❌ Ngrok expirou

O Ngrok gratuito expira a cada 8 horas.

**Solução**:
1. Gere novo Ngrok: `ngrok http 5000`
2. Copia a URL
3. Atualiza no Vercel → Settings → Environment Variables
4. Redeploye

---

## 📊 Arquitetura Final

```
┌──────────────────────────────────┐
│  Frontend (Vercel)               │
│  https://venopay-frontend...     │
└───────────┬──────────────────────┘
            │
            │ https://abc123.ngrok.io
            ↓
┌──────────────────────────────────┐
│  Ngrok (seu PC)                  │
│  https://abc123.ngrok.io         │
└───────────┬──────────────────────┘
            │
            │ http://localhost:5000
            ↓
┌──────────────────────────────────┐
│  Backend (NestJS local)          │
│  http://localhost:5000           │
└───────────┬──────────────────────┘
            │
            │ localhost:5432
            ↓
┌──────────────────────────────────┐
│  Database (PostgreSQL Docker)    │
│  postgresql://localhost:5432     │
└──────────────────────────────────┘
```

---

## ✅ Checklist Final

- [x] Frontend enviado para GitHub
- [ ] Conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy completado
- [ ] Ngrok rodando
- [ ] Backend rodando localmente
- [ ] Database rodando
- [ ] Login testado no Vercel
- [ ] Dashboard carregando dados

---

## 🎉 Resultado

Seu stack completo está funcionando:

```
🌐 Frontend em Vercel → 🔗 Ngrok → 💻 Backend Local → 🗄️ Database Docker
```

**Tudo pronto!** Agora é só conectar ao Vercel e fazer o deploy! 🚀

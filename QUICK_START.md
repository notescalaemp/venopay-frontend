# 🚀 INÍCIO RÁPIDO - VenoPay Frontend

## Executar o Projeto

### 1. Instalação de Dependências
```bash
cd frontend
npm install
```

### 2. Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:5173`

### 3. Build para Produção
```bash
npm run build
```

Resultado: pasta `dist/` com arquivos otimizados

## 📝 Credenciais de Teste

**Email:** admin@gateway.com  
**Senha:** Admin@123

Essas credenciais vêm pré-preenchidas na página de login.

## 🎨 Cores do Projeto

| Cor | Hex | Uso |
|-----|-----|-----|
| Preto | #111827 | Backgrounds e headers |
| Branco | #FFFFFF | Cards e foregrounds |
| Laranja | #F97316 | Botões e destaques |

## 📂 Estrutura Principal

```
frontend/
├── src/
│   ├── pages/           # Páginas (Login, Dashboard)
│   ├── components/      # Componentes reutilizáveis
│   ├── auth/            # Autenticação
│   ├── api/             # HTTP Client
│   ├── hooks/           # Custom hooks
│   ├── routes/          # Roteamento
│   ├── config/          # Constantes
│   └── styles/          # Estilos globais
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔗 URLs Principais

- **Login**: http://localhost:5173/login
- **Dashboard**: http://localhost:5173/dashboard
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## 🐛 Troubleshooting

### Erro de Conexão com Backend
Certifique-se que o backend está rodando em `http://localhost:5000`

### Erro ao Fazer Login
- Verifique as credenciais
- Limpe o localStorage: `localStorage.clear()`
- Recarregue a página

### Erro de Build
```bash
rm -rf node_modules
npm install
npm run build
```

## 📚 Documentação

Consulte os arquivos:
- `FRONTEND_GUIDE.md` - Guia completo
- `VISUAL_STYLE_GUIDE.md` - Estilos
- `README_FINAL.md` - Resumo do projeto

## ✅ Status

✅ Pronto para produção  
✅ Build compilado  
✅ Design responsivo  
✅ Segurança implementada  

---

**Versão**: 1.0.0  
**Última atualização**: 12 de Janeiro de 2024

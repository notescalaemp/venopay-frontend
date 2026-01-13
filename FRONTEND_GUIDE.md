# VenoPay Frontend

Frontend unificado para o Gateway de Pagamentos VenoPay com design profissional em Preto, Branco e Laranja.

## 🎨 Paleta de Cores

- **Preto**: #111827 (Dark 900)
- **Branco**: #FFFFFF 
- **Laranja**: #F97316 (Primary 500)

## 🚀 Quickstart

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📝 Credenciais de Teste

- **Email**: admin@gateway.com
- **Senha**: Admin@123

## 🏗️ Estrutura do Projeto

```
src/
├── api/           # Configuração HTTP e API
├── auth/          # Autenticação e contexto
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas (Login, Dashboard, etc)
├── routes/        # Configuração de rotas
├── styles/        # Estilos globais
└── main.tsx       # Entrada da aplicação
```

## 📦 Dependências Principais

- **React** 18.2.0 - Library UI
- **React Router** 6.20.0 - Roteamento
- **TypeScript** 5.3.3 - Type safety
- **Tailwind CSS** 3.4.0 - Styling
- **Lucide React** 0.294.0 - Ícones
- **Axios** 1.6.2 - HTTP Client
- **Zustand** 4.4.1 - State Management
- **React Query** 5.28.0 - Data Fetching
- **React Hook Form** 7.48.1 - Form Management
- **Sonner** 1.3.1 - Toast Notifications

## 🎯 Funcionalidades

### Autenticação
- Login com email e senha
- Persistência de token
- Proteção de rotas
- Logout seguro

### Dashboard
- Visualização de saldo
- Transações recentes
- Estatísticas em tempo real
- Menu de navegação responsivo

### Componentes
- **Button**: Botões com variações
- **Card**: Cards com header, body e footer
- **Alert**: Alertas de sucesso, erro, aviso e info

## 🔒 Segurança

- JWT Token no localStorage
- Interceptors para autorização
- Refresh token automático (401)
- Validação de rotas protegidas

## 📱 Responsividade

Design 100% responsivo:
- Mobile-first approach
- Breakpoints: sm, md, lg
- Sidebar colapsável
- Menu adaptativo

## 🌙 Tema

Sistema de cores variável com support para:
- Modo claro (padrão)
- Modo escuro (futuro)
- Temas personalizáveis

## 📚 API

Configurada em `src/api/http.ts`

Base URL: `http://localhost:5000/api/v1`

Endpoints principais:
- `POST /auth/login` - Login
- `GET /transactions` - Listar transações
- `POST /payments` - Criar pagamento

## 🐛 Troubleshooting

### Erro de Conexão
Verifique se o backend está rodando em `http://localhost:5000`

### Erro 401
Limpe o localStorage e faça login novamente

### Erro de CORS
Configure CORS no backend

## 📄 Licença

© 2024 VenoPay. Todos os direitos reservados.

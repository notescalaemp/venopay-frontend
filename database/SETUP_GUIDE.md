# 🚀 SETUP COMPLETO - PAYMENT GATEWAY DATABASE

## ✅ Estrutura Criada

```
database/
├── prisma/
│   ├── schema.prisma          ✅ Schema completo com 22 models
│   ├── seed.ts                ✅ Script de seed com dados iniciais
│   └── migrations/            ✅ Pasta de migrações
├── docker-compose.yml         ✅ PostgreSQL 15 + Redis 7 + Adminer
├── package.json               ✅ Dependências configuradas
├── .env                       ✅ Variáveis de ambiente
├── .env.example               ✅ Exemplo de .env
├── tsconfig.json              ✅ Configuração TypeScript
├── .gitignore                 ✅ Git ignore configurado
├── README.md                  ✅ Documentação
└── SETUP_GUIDE.md             ✅ Este arquivo
```

## 📋 Models Criados (22 no total)

### Core Models
- **User** - Usuários do sistema (admin, manager, seller, sub_account)
- **RefreshToken** - Tokens de autenticação
- **Manager** - Gerenciadores de sellers
- **Seller** - Lojistas com dados de negócio
- **SubAccount** - Sub-contas de sellers com permissões

### Payment & Acquirer Models
- **Acquirer** - Adquirentes de pagamento (Stripe, PayPal, etc)
- **FeeConfig** - Configuração de taxas (cash in/out)
- **RetentionConfig** - Configuração de retenção de valores
- **Transaction** - Transações de pagamento completas
- **SplitTransaction** - Divisão de transações entre recipientes

### Wallet & Crypto Models
- **Wallet** - Carteiras com suporte a 9 moedas/criptos
- **WalletTransaction** - Movimentações de carteira
- **CryptoPayment** - Pagamentos em criptomoedas
- **PixPayment** - Pagamentos via PIX com QR Code

### Checkout & Commerce Models
- **Checkout** - Páginas de checkout customizadas
- **CustomDomain** - Domínios customizados com SSL
- **PixConfig** - Configuração de chaves PIX

### Tracking & Events Models
- **PixelConfig** - Pixels de tracking (Facebook, Google, TikTok)
- **ConversionEvent** - Eventos de conversão
- **UTMTracking** - Rastreamento de UTM parameters
- **WebhookLog** - Logs de webhooks
- **AuditLog** - Logs de auditoria de ações

## 🔐 Enums Implementados

- **UserRole** - ADMIN, MANAGER, SELLER, SUB_ACCOUNT
- **UserStatus** - ACTIVE, INACTIVE, PENDING, SUSPENDED
- **TransactionStatus** - PENDING, PROCESSING, APPROVED, DECLINED, REFUNDED, CANCELED, CHARGEBACK
- **PaymentMethod** - CREDIT_CARD, DEBIT_CARD, PIX, BOLETO, WALLET, CRYPTO
- **Currency** - BRL, USD, EUR, GBP, USDT, BTC, ETH, SOL, XMR
- **FeeType** - FIXED, PERCENTAGE, COMBINED
- **WalletTransactionType** - DEPOSIT, WITHDRAW, P2P_SEND, P2P_RECEIVE, PAYMENT, REFUND, FEE, CHARGEBACK
- **KYCStatus** - PENDING, APPROVED, REJECTED, EXPIRED
- **AcquirerType** - STRIPE, PAYPAL, ADYEN, GERENCIANET, CUSTOM
- **SSLStatus** - PENDING, ACTIVE, EXPIRED, INVALID
- **PixKeyType** - CPF, CNPJ, EMAIL, PHONE, RANDOM_KEY
- **ConversionEventName** - PAGE_VIEW, ADD_TO_CART, PURCHASE, CHECKOUT_START, CHECKOUT_COMPLETE

## 🌊 Relacionamentos Estruturados

- User → Manager/Seller/SubAccount (1:1 polimórfico)
- Manager → Sellers (1:N)
- Seller → Transactions, Checkouts, Wallets, Configs (1:N)
- Seller → Acquirer (N:1)
- Transaction → SplitTransaction (1:N)
- Transaction → CryptoPayment/PixPayment (1:1 opcional)
- Wallet → WalletTransaction (1:N)
- Checkout → CustomDomain (1:N)
- E muitos outros relacionamentos

## 🗄️ Índices para Performance

Adicionados índices em:
- email, role, status (User)
- sellerId, acquirerId, status, currency (Transaction)
- walletId, type, currency (WalletTransaction)
- sellerId, domain (CustomDomain)
- platform, pixelId (PixelConfig)
- url, success, createdAt (WebhookLog)
- userId, action, entity, createdAt (AuditLog)
- E muitos outros para queries frequentes

## 🔑 Dados Iniciais (Seed)

O script seed cria automaticamente:

```
👤 Admin: admin@gateway.com / Admin@123
👤 Manager: manager@gateway.com / Admin@123
👤 Seller: seller@test.com / Admin@123

💳 Acquirer: Stripe
💰 Fee Config: 2.99% cash in, R$ 5.00 cash out
⏰ Retention Config: 14 dias, 10% retido
💼 Wallet: Criada para o seller
```

## 📦 Dependências Instaladas

```json
{
  "@prisma/client": "^5.9.1",
  "prisma": "^5.9.1",
  "ts-node": "^10.9.2",
  "typescript": "^5.3.3",
  "@types/node": "^20.11.5",
  "bcrypt": "^5.1.1",
  "@types/bcrypt": "^5.0.2"
}
```

## 🚀 Próximos Passos

### Quando Docker estiver disponível:

```bash
# 1. Iniciar containers
docker-compose up -d

# 2. Criar migration inicial
npm run db:migrate

# 3. Popular banco com seed
npm run db:seed

# 4. Abrir Prisma Studio
npm run db:studio
```

### Acessar Serviços:
- **Prisma Studio**: http://localhost:5555
- **Adminer**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 💻 Comandos Disponíveis

```bash
npm run db:migrate    # Criar/aplicar migrações (com Prisma Studio)
npm run db:seed       # Popular banco com dados iniciais
npm run db:studio     # Abrir interface gráfica do Prisma
npm run db:generate   # Regenerar Prisma Client
npm run db:reset      # Resetar banco (Ctrl+C antes!)
```

## 🛠️ Arquivos de Configuração

- `.env` - Variáveis de ambiente (DATABASE_URL, REDIS_URL)
- `tsconfig.json` - Configuração TypeScript
- `.gitignore` - Arquivos ignorados pelo Git
- `package.json` - Scripts e dependências

## 📝 Schema Prisma

O arquivo [prisma/schema.prisma](prisma/schema.prisma) contém:
- 22 Models com relacionamentos completos
- 11 Enums para tipos de dados
- Índices otimizados para performance
- Constraints e validações
- Tipos de dados apropriados (Decimal para valores monetários, etc)

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Credentials de adquirentes armazenadas como JSON criptografado
- Suporte a SSL/TLS para domínios customizados
- Auditoria completa de ações (AuditLog)
- Webhooks com tentativas e logs

## 🎯 Próximas Implementações

1. **Backend API** - Express/NestJS com endpoints REST
2. **Autenticação** - JWT com refresh tokens
3. **Integração de Adquirentes** - Stripe, Adyen, etc
4. **Webhooks** - Sistema robusto de webhooks
5. **Cache Redis** - Implementação com Redis
6. **Testes** - Unit, integration, e2e
7. **CI/CD** - GitHub Actions / GitLab CI
8. **Documentação OpenAPI** - Swagger/Scalar
9. **Docker** - Production-ready Dockerfile
10. **Monitoring** - Logging, tracing, alertas

## ✨ Status

- ✅ Package.json
- ✅ Docker Compose configurado
- ✅ Schema Prisma completo
- ✅ Seed script
- ✅ Variáveis de ambiente
- ✅ TypeScript configurado
- ✅ Prisma Client gerado
- ✅ Documentação
- ⏳ Migrations (aguardando Docker)
- ⏳ Seed database (aguardando Docker)

---

**Criado em**: 12 de janeiro de 2026
**Versão**: 1.0.0
**Status**: Pronto para usar quando Docker estiver disponível

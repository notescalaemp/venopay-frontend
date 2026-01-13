# Payment Gateway Database

## Setup

1. Start containers:
```bash
docker-compose up -d
```

2. Install dependencies:
```bash
npm install
```

3. Run migrations:
```bash
npm run db:migrate
```

4. Seed database:
```bash
npm run db:seed
```

5. Open Prisma Studio:
```bash
npm run db:studio
```

## Default Users

- **Admin**: admin@gateway.com / Admin@123
- **Manager**: manager@gateway.com / Admin@123
- **Seller**: seller@test.com / Admin@123

## Adminer

Access: http://localhost:8080
- Server: postgres
- User: postgres
- Password: postgres123
- Database: payment_gateway

## Database Schema

### 22 Models:
1. User - Usuários do sistema
2. RefreshToken - Tokens de autenticação
3. Manager - Gerenciadores de sellers
4. Seller - Lojistas
5. SubAccount - Sub-contas de sellers
6. Acquirer - Adquirentes de pagamento
7. FeeConfig - Configuração de taxas
8. RetentionConfig - Configuração de retenção
9. Transaction - Transações de pagamento
10. SplitTransaction - Divisão de transações
11. Wallet - Carteiras digitais
12. WalletTransaction - Transações em carteira
13. CryptoPayment - Pagamentos em criptomoedas
14. Checkout - Checkouts personalizados
15. CustomDomain - Domínios customizados
16. PixConfig - Configuração PIX
17. PixPayment - Pagamentos via PIX
18. PixelConfig - Configuração de pixels de tracking
19. ConversionEvent - Eventos de conversão
20. UTMTracking - Rastreamento de UTM
21. WebhookLog - Logs de webhooks
22. AuditLog - Logs de auditoria

## Available Commands

```bash
npm run db:migrate    # Criar/aplicar migrações
npm run db:seed       # Popular banco com dados iniciais
npm run db:studio     # Abrir Prisma Studio
npm run db:generate   # Gerar Prisma Client
npm run db:reset      # Resetar banco (cuidado!)
```

## Network

Todos os serviços estão na rede `gateway-network`:
- PostgreSQL: postgres://postgres:postgres123@postgres:5432/payment_gateway
- Redis: redis://:redis123@redis:6379

# 🎨 VenoPay Frontend - Guia Visual

## 📐 Estrutura de Cores

### Paleta Principal

```
┌─────────────────────────────────────────┐
│  PRETO (#111827)                        │ Cor principal, backgrounds, textos
├─────────────────────────────────────────┤
│  BRANCO (#FFFFFF)                       │ Backgrounds, cards, texto luz
├─────────────────────────────────────────┤
│  LARANJA (#F97316)                      │ Botões, destaques, links, borders
└─────────────────────────────────────────┘
```

### Paleta Estendida

**Preto (Dark)**
```
- 50:   #f9fafb (Quase branco)
- 100:  #f3f4f6 (Cinza muito claro)
- 200:  #e5e7eb (Cinza claro)
- 300:  #d1d5db (Cinza médio)
- 400:  #9ca3af (Cinza)
- 500:  #6b7280 (Cinza escuro)
- 600:  #4b5563 (Cinza mais escuro)
- 700:  #374151 (Cinza muito escuro)
- 800:  #1f2937 (Cinza quase preto)
- 900:  #111827 (Preto puro)
```

**Laranja (Primary)**
```
- 50:   #fff7ed (Laranja muito claro)
- 100:  #ffedd5 (Laranja claro)
- 200:  #fed7aa (Laranja claro)
- 300:  #fdba74 (Laranja médio)
- 400:  #fb923c (Laranja médio)
- 500:  #f97316 (Laranja puro) ⭐
- 600:  #ea580c (Laranja escuro)
- 700:  #c2410c (Laranja mais escuro)
- 800:  #9a3412 (Laranja muito escuro)
- 900:  #7c2d12 (Laranja quase preto)
```

## 🎯 Componentes

### Button

```typescript
<Button variant="primary">Entrar</Button>           // Laranja
<Button variant="secondary">Cancelar</Button>      // Cinza
<Button variant="danger">Deletar</Button>          // Vermelho
<Button variant="outline">Saiba Mais</Button>      // Laranja bordado
```

### Card

```typescript
<Card>
  <CardHeader title="Transações" />
  <CardBody>Conteúdo aqui</CardBody>
  <CardFooter>Rodapé</CardFooter>
</Card>
```

### Alert

```typescript
<Alert type="success" message="Sucesso!" />
<Alert type="error" title="Erro" message="Algo deu errado" />
<Alert type="warning" message="Aviso importante" />
<Alert type="info" message="Informação" />
```

## 🏗️ Layouts

### Login Page

```
┌────────────────────────────────────────┐
│  Gradiente Preto (Fundo)               │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │   🔒 VenoPay                    │  │
│  │   Gateway de Pagamentos         │  │
│  │                                  │  │
│  │   ✉️  Email: [____________]     │  │
│  │   🔐 Senha: [____________]      │  │
│  │                                  │  │
│  │   [🟠 Entrar 🟠]               │  │
│  │                                  │  │
│  │   Credenciais de Teste:         │  │
│  │   admin@gateway.com             │  │
│  │   Admin@123                     │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

### Dashboard

```
┌──────────────────────────────────────────────────────────┐
│  VenoPay Logo   🔍 Buscar    🔔   👤 Admin   🚪         │
├──────────────┬──────────────────────────────────────────┤
│ 📊 Dashboard │  Bem-vindo, Admin!                       │
│ 💳 Pagamentos│                                          │
│ 💰 Carteira  │  ┌────────┬────────┬────────┬────────┐  │
│ 📈 Análises  │  │ Saldo  │ Trans. │ Usuár. │ Vendas │  │
│ 👥 Usuários  │  │ Total  │ Hoje   │ Ativos │        │  │
│ ⚙️  Config    │  └────────┴────────┴────────┴────────┘  │
│              │                                          │
│              │  Transações Recentes                     │
│ Versão 1.0.0 │  ┌──────────┬─────────┬────────────┐    │
│              │  │ Cliente  │ Valor   │ Status     │    │
│              │  ├──────────┼─────────┼────────────┤    │
│              │  │ João S.  │ R$ 250  │ ✅ Concl.  │    │
│              │  │ Maria S. │ R$ 150  │ ⏳ Pend.   │    │
│              │  └──────────┴─────────┴────────────┘    │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

## 🎨 Tipografia

### Headings
- **H1**: 30px | Bold | Dark-900
- **H2**: 24px | Bold | Dark-900
- **H3**: 18px | Bold | Dark-900

### Text
- **Body**: 16px | Regular | Dark-900
- **Small**: 14px | Regular | Dark-600
- **Extra Small**: 12px | Regular | Dark-500

### Links
- **Cor**: Primary-500 (Laranja)
- **Hover**: Primary-600
- **Decoração**: Underline on hover

## 🎭 Espaçamento

```
xs: 0.25rem (4px)
sm: 0.5rem  (8px)
md: 1rem    (16px)
lg: 1.5rem  (24px)
xl: 2rem    (32px)
2xl: 3rem   (48px)
```

## 🔲 Rounded Corners

- Small: 4px
- Medium: 8px
- Large: 16px
- XL: 24px

## 📦 Sombras

```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.07)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.15)
```

## 🎬 Animações

```css
fadeIn: 0.3s ease-out
slideIn: 0.3s ease-out
bounce: 1s infinite
pulse: 2s infinite
spin: 1s linear infinite
```

## 📱 Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ✨ Efeitos

### Hover States
- Buttons: Scale 105%
- Cards: Translatey -4px + shadow
- Links: Underline + color change

### Active States
- Buttons: Scale 95%

### Disabled States
- Opacity: 50%
- Cursor: not-allowed

## 🎯 Ícones

Usando **Lucide React** 0.294.0

```typescript
import { Home, Lock, Mail, Eye, LogOut } from 'lucide-react';

<Home className="w-5 h-5" />
```

## 🌍 Acessibilidade

- ✅ Contraste WCAG AA
- ✅ Navegação por teclado
- ✅ Labels semânticos
- ✅ ARIA labels onde necessário
- ✅ Focus states visíveis

## 🚀 Performance

- ✅ CSS minificado (0.94 kB gzip)
- ✅ JS otimizado (86.81 kB gzip)
- ✅ Lazy loading de componentes
- ✅ Scroll bar customizada

---

**Versão**: 1.0.0  
**Data**: 12 de Janeiro de 2024

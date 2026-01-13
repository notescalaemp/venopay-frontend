# 📝 Criar Repositório no GitHub

## Passo 1: Criar Repositório

1. Acesse https://github.com/new
2. Preencha:
   - **Repository name**: `venopay-frontend`
   - **Description**: VenoPay Frontend - React + TypeScript
   - **Visibility**: Public (ou Private se preferir)
   - NÃO marque "Initialize this repository with..."

3. Clique "Create repository"

## Passo 2: Copiar URL HTTPS

Será algo como: `https://github.com/seu-usuario/venopay-frontend.git`

## Passo 3: Atualizar Remote

```bash
cd frontend

# Se tiver remote errado, remova
git remote remove origin

# Adicione o novo (substitua pela URL correta)
git remote add origin https://github.com/seu-usuario/venopay-frontend.git

# Verifique
git remote -v
```

## Passo 4: Fazer Push

```bash
git branch -M main
git push -u origin main
```

---

## ⚠️ IMPORTANTE

**Não deixe espaços ou caracteres especiais na URL!**

Copie exatamente da tela do GitHub após criar o repositório.

# 🚀 COMANDOS PARA DEPLOY - AG ASSESSORIA

## 📋 PASSO 1: PREPARAR O AMBIENTE
# Criar pasta do projeto
mkdir ag-assessoria-app
cd ag-assessoria-app

# Inicializar projeto React
npx create-react-app . --template typescript
# OU para JavaScript normal:
npx create-react-app .

## 📋 PASSO 2: INSTALAR DEPENDÊNCIAS
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

## 📋 PASSO 3: SUBSTITUIR ARQUIVOS
# Substituir os seguintes arquivos pelos fornecidos:
# - src/App.js (código principal)
# - src/index.css (estilos Tailwind)
# - package.json (dependências)
# - tailwind.config.js (configuração)
# - README.md (documentação)
# - .gitignore (arquivos ignorados)

## 📋 PASSO 4: TESTAR LOCALMENTE
npm start
# Abrir http://localhost:3000

## 📋 PASSO 5: CONFIGURAR GIT
git init
git add .
git commit -m "🚀 AG Assessoria v1.0 - Sistema Completo"

## 📋 PASSO 6: CRIAR REPOSITÓRIO NO GITHUB
# 1. Ir para github.com
# 2. Clicar em "New repository"
# 3. Nome: ag-assessoria-app
# 4. Descrição: Sistema de gestão para AG Assessoria
# 5. Público ou Privado (sua escolha)
# 6. NÃO marcar "Initialize with README"
# 7. Clicar "Create repository"

## 📋 PASSO 7: CONECTAR COM GITHUB
git remote add origin https://github.com/[SEU-USUARIO]/ag-assessoria-app.git
git branch -M main
git push -u origin main

## 🌐 OPÇÕES DE DEPLOY GRATUITO:

### OPÇÃO 1: VERCEL (RECOMENDADO)
# 1. Ir para vercel.com
# 2. Conectar com GitHub
# 3. Importar repositório ag-assessoria-app
# 4. Deploy automático!
# URL: https://ag-assessoria-app.vercel.app

### OPÇÃO 2: NETLIFY
# 1. Ir para netlify.com
# 2. "New site from Git"
# 3. Conectar GitHub
# 4. Escolher repositório
# 5. Deploy automático!

### OPÇÃO 3: GITHUB PAGES
npm install --save-dev gh-pages

# Adicionar no package.json:
# "homepage": "https://[SEU-USUARIO].github.io/ag-assessoria-app",
# "scripts": {
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d build"
# }

npm run deploy
# URL: https://[SEU-USUARIO].github.io/ag-assessoria-app

### OPÇÃO 4: FIREBASE HOSTING
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy

## 🔧 COMANDOS ÚTEIS:

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Fazer build para produção
npm run build

# Testar build localmente
npx serve -s build

# Verificar problemas
npm audit
npm audit fix

# Atualizar dependências
npm update

## 📱 DOMÍNIO PERSONALIZADO:

### Para usar agassessoriaonline.com.br:
# 1. No painel do Vercel/Netlify
# 2. Settings > Domains
# 3. Adicionar: agassessoriaonline.com.br
# 4. Configurar DNS:
#    - CNAME: www -> ag-assessoria-app.vercel.app
#    - A: @ -> IP do Vercel

## 🔄 WORKFLOW DE DESENVOLVIMENTO:

# 1. Fazer alterações no código
git add .
git commit -m "✨ Nova funcionalidade"
git push

# 2. Deploy automático no Vercel/Netlify
# 3. Testar no ambiente de produção

## 📊 MONITORAMENTO:

# Analytics (opcional)
# - Google Analytics
# - Vercel Analytics
# - Netlify Analytics

## 🔒 SEGURANÇA:

# Variáveis de ambiente (.env)
REACT_APP_API_URL=https://api.agassessoriaonline.com.br
REACT_APP_VERSION=1.0.0

# No Vercel/Netlify:
# Settings > Environment Variables

## 🚀 SUCESSO!
# Seu sistema estará disponível em:
# https://ag-assessoria-app.vercel.app
# ou
# https://agassessoriaonline.com.br
# 🚀 Guia de Implementação do Backend - Dior E-commerce

## 📊 Status Atual do Projeto

### ✅ Frontend Completo (80%)

- Menu de perfil lateral com animações GSAP
- Modal de cadastro e login
- Carrinho de compras funcional
- Sistema de navegação SPA
- Páginas de produtos (Miss Dior, J'adore, etc.)
- Interface responsiva

### ❌ Backend - A Fazer (0%)

- API REST
- Banco de dados
- Sistema de autenticação
- Gerenciamento de pedidos

---

## 🏗️ Arquitetura do Sistema Completo

```
📁 Projeto Dior
│
├── 📁 Frontend (Atual - src/)
│   ├── components/
│   │   ├── ProfileMenu.js ✅
│   │   ├── AppNavigation.js ✅
│   │   └── ProductsGrid.js ✅
│   ├── pages/ ✅
│   ├── styles/ ✅
│   └── router/ ✅
│
└── 📁 Backend (A Criar - backend/)
    ├── server.js
    ├── models/
    │   ├── User.js
    │   └── Order.js
    ├── routes/
    │   ├── auth.js
    │   └── orders.js
    ├── middleware/
    │   └── auth.js
    └── config/
        └── database.js
```

---

## 🗄️ Estrutura do Banco de Dados

### MongoDB Collections

#### 1. Users (Usuários)

```javascript
{
  "_id": ObjectId("..."),
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "$2b$10$hash...", // Hash bcrypt
  "createdAt": ISODate("2025-11-04T..."),
  "updatedAt": ISODate("2025-11-04T...")
}
```

#### 2. Orders (Pedidos)

```javascript
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."), // Referência ao usuário
  "orderNumber": "DOR-2025-0001",
  "items": [
    {
      "productId": 1,
      "name": "Miss Dior Essence",
      "volume": "35 ml",
      "price": 799.00,
      "quantity": 1,
      "image": "./images/dioressence1.webp"
    },
    {
      "productId": 2,
      "name": "Miss Dior Parfum",
      "volume": "50 ml",
      "price": 665.00,
      "quantity": 2,
      "image": "./images/parfum1.webp"
    }
  ],
  "subtotal": 2129.00,
  "discount": 0,
  "total": 2129.00,
  "status": "pending", // pending, paid, processing, shipped, delivered, cancelled
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "name": "João Silva",
    "street": "Av. Paulista, 1000",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01310-100",
    "country": "Brasil"
  },
  "createdAt": ISODate("2025-11-04T..."),
  "updatedAt": ISODate("2025-11-04T...")
}
```

#### 3. Sessions (Opcional - para controle de sessões)

```javascript
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "token": "jwt-token-here",
  "expiresAt": ISODate("2025-11-11T..."),
  "createdAt": ISODate("2025-11-04T...")
}
```

---

## 🔌 API Endpoints

### Autenticação

| Método | Endpoint             | Descrição               | Auth Required |
| ------ | -------------------- | ----------------------- | ------------- |
| POST   | `/api/auth/register` | Cadastrar novo usuário  | ❌            |
| POST   | `/api/auth/login`    | Login do usuário        | ❌            |
| POST   | `/api/auth/logout`   | Logout do usuário       | ✅            |
| GET    | `/api/auth/me`       | Dados do usuário logado | ✅            |

### Pedidos

| Método | Endpoint          | Descrição                 | Auth Required |
| ------ | ----------------- | ------------------------- | ------------- |
| POST   | `/api/orders`     | Criar novo pedido         | ✅            |
| GET    | `/api/orders`     | Listar pedidos do usuário | ✅            |
| GET    | `/api/orders/:id` | Detalhes de um pedido     | ✅            |
| PUT    | `/api/orders/:id` | Atualizar pedido          | ✅            |
| DELETE | `/api/orders/:id` | Cancelar pedido           | ✅            |

---

## 💻 Stack Tecnológica Recomendada

### Backend

- **Node.js** v18+ (Runtime JavaScript)
- **Express.js** v4.18+ (Framework web)
- **MongoDB** v6+ (Banco de dados NoSQL)
- **Mongoose** v7+ (ODM para MongoDB)

### Autenticação & Segurança

- **jsonwebtoken** (JWT para autenticação)
- **bcrypt** (Hash de senhas)
- **helmet** (Headers de segurança)
- **cors** (Cross-Origin Resource Sharing)
- **express-validator** (Validação de dados)

### Desenvolvimento

- **nodemon** (Auto-reload em desenvolvimento)
- **dotenv** (Variáveis de ambiente)
- **morgan** (Logger de requisições)

---

## 📦 Dependências do Projeto Backend

### package.json

```json
{
  "name": "dior-backend",
  "version": "1.0.0",
  "description": "Backend API para e-commerce Dior",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-validator": "^7.0.1",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "morgan": "^1.10.0"
  }
}
```

---

## 🔐 Variáveis de Ambiente (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/dior-shop
# Ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dior-shop

# JWT
JWT_SECRET=seu-secret-key-super-seguro-aqui-change-in-production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173
# Em produção:
# CORS_ORIGIN=https://seu-dominio.com

# Upload (Opcional - para imagens de produtos)
MAX_FILE_SIZE=5242880
```

---

## ⏱️ Cronograma de Implementação

### Fase 1: Setup Inicial (1 dia)

- [ ] Criar pasta `backend/`
- [ ] Inicializar projeto Node.js (`npm init`)
- [ ] Instalar dependências
- [ ] Configurar estrutura de pastas
- [ ] Criar arquivo `.env`
- [ ] Conectar ao MongoDB

### Fase 2: Modelos e Schemas (1 dia)

- [ ] Criar modelo User
- [ ] Criar modelo Order
- [ ] Testar conexão com banco
- [ ] Criar seeds (dados de teste)

### Fase 3: Autenticação (2 dias)

- [ ] Rota de registro (`POST /api/auth/register`)
- [ ] Rota de login (`POST /api/auth/login`)
- [ ] Middleware de autenticação
- [ ] Rota de logout
- [ ] Rota para obter usuário logado
- [ ] Testar com Postman/Insomnia

### Fase 4: Pedidos (2 dias)

- [ ] Rota criar pedido (`POST /api/orders`)
- [ ] Rota listar pedidos (`GET /api/orders`)
- [ ] Rota detalhes do pedido (`GET /api/orders/:id`)
- [ ] Rota atualizar pedido
- [ ] Validações de negócio
- [ ] Testar fluxo completo

### Fase 5: Integração Frontend (2 dias)

- [ ] Criar serviço API no frontend (`src/services/api.js`)
- [ ] Integrar cadastro/login
- [ ] Integrar carrinho com API
- [ ] Adicionar tratamento de erros
- [ ] Testar fluxo completo

### Fase 6: Deploy (1 dia)

- [ ] Configurar MongoDB Atlas
- [ ] Deploy backend (Railway/Render)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Configurar variáveis de ambiente
- [ ] Testar em produção

**TOTAL: ~9 dias de desenvolvimento**

---

## 🎯 Prioridades de Implementação

### Alta Prioridade

1. ✅ Sistema de autenticação (Registro + Login)
2. ✅ Criação de pedidos
3. ✅ Listagem de pedidos do usuário

### Média Prioridade

4. Atualização de status do pedido
5. Sistema de cupons (validação backend)
6. Histórico de pedidos

### Baixa Prioridade

7. Sistema de avaliações de produtos
8. Wishlist (lista de desejos)
9. Notificações por email
10. Painel administrativo

---

## 🔒 Segurança - Checklist

- [ ] Validar todos os inputs
- [ ] Sanitizar dados do usuário
- [ ] Usar HTTPS em produção
- [ ] Implementar rate limiting
- [ ] Configurar CORS corretamente
- [ ] Hash de senhas com bcrypt (min 10 rounds)
- [ ] JWT com expiração
- [ ] Validar tokens em todas as rotas protegidas
- [ ] Não expor informações sensíveis em erros
- [ ] Usar helmet para headers de segurança

---

## 📝 Notas Importantes

### Dados Ficticios para Teste

Quando criar o backend, você pode usar estes dados de exemplo:

**Usuário de Teste:**

```javascript
{
  email: "teste@dior.com",
  password: "123456",
  name: "Usuário Teste"
}
```

**Produtos (já definidos no frontend):**

```javascript
const products = [
  { id: 1, name: "Miss Dior Essence", price: 799, volume: "35ml" },
  { id: 2, name: "Miss Dior Parfum", price: 665, volume: "35ml" },
  { id: 3, name: "J'adore Eau de Parfum", price: 665, volume: "50ml" },
  { id: 4, name: "J'adore Parfum d'Eau", price: 765, volume: "50ml" },
  { id: 5, name: "J'adore Infinissime", price: 715, volume: "50ml" },
];
```

### Integração com Frontend

O frontend já possui a estrutura de dados do carrinho em `ProfileMenu.js`:

```javascript
this.cartItems = [
  {
    id: 1,
    name: "Miss Dior Essence",
    volume: "35 ml",
    price: 799.0,
    quantity: 1,
    image: "./images/dioressence1.webp",
  },
];
```

Esta estrutura deve ser mantida ao enviar para a API.

---

## 🚀 Como Começar (Quando estiver pronto)

1. **Criar pasta backend:**

   ```bash
   mkdir backend
   cd backend
   ```

2. **Inicializar projeto:**

   ```bash
   npm init -y
   ```

3. **Instalar dependências:**

   ```bash
   npm install express mongoose bcrypt jsonwebtoken cors helmet dotenv express-validator
   npm install --save-dev nodemon morgan
   ```

4. **Copiar os arquivos de exemplo** do arquivo `BACKEND-CODE-EXAMPLES.md`

5. **Configurar MongoDB:**

   - Local: Instalar MongoDB Community
   - Cloud: Criar conta no MongoDB Atlas (gratuito)

6. **Executar servidor:**
   ```bash
   npm run dev
   ```

---

## 📚 Recursos de Aprendizado

- **Node.js:** https://nodejs.org/docs
- **Express.js:** https://expressjs.com
- **MongoDB:** https://www.mongodb.com/docs
- **Mongoose:** https://mongoosejs.com/docs
- **JWT:** https://jwt.io/introduction
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

## 🤝 Suporte

Quando for implementar o backend, siga este guia passo a passo. Todos os códigos de exemplo estão no arquivo `BACKEND-CODE-EXAMPLES.md`.

**Data de criação:** 04/11/2025
**Versão do Frontend:** 1.0.0
**Status:** Frontend 80% - Backend 0%

# 💻 Exemplos de Código - Backend Dior E-commerce

## 📁 Estrutura de Arquivos Backend

```
backend/
├── server.js                 # Arquivo principal
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências
├── config/
│   └── database.js          # Configuração MongoDB
├── models/
│   ├── User.js              # Modelo de Usuário
│   └── Order.js             # Modelo de Pedido
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   └── orders.js            # Rotas de pedidos
└── middleware/
    └── auth.js              # Middleware de autenticação
```

---

## 🔧 server.js (Arquivo Principal)

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

// Inicializar Express
const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(helmet()); // Segurança
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
app.use(morgan("dev")); // Logger

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Rota de teste
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Dior API está funcionando!",
    timestamp: new Date().toISOString(),
  });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
```

---

## 🗄️ config/database.js

```javascript
// config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 👤 models/User.js

```javascript
// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [3, "Nome deve ter no mínimo 3 caracteres"],
      maxlength: [100, "Nome deve ter no máximo 100 caracteres"],
    },
    email: {
      type: String,
      required: [true, "E-mail é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "E-mail inválido"],
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
      select: false, // Não retorna senha por padrão em queries
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

// Hash da senha antes de salvar
UserSchema.pre("save", async function (next) {
  // Só hash se a senha foi modificada
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para retornar dados públicos do usuário
UserSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("User", UserSchema);
```

---

## 📦 models/Order.js

```javascript
// models/Order.js
const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  image: {
    type: String,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, "Pedido deve ter pelo menos 1 item"],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "pix", "boleto"],
      default: "credit_card",
    },
    shippingAddress: {
      name: String,
      street: String,
      number: String,
      complement: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "Brasil" },
    },
  },
  {
    timestamps: true,
  }
);

// Gerar número do pedido antes de salvar
OrderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `DOR-${year}-${String(count + 1).padStart(6, "0")}`;
  }
  next();
});

// Método para calcular total
OrderSchema.methods.calculateTotal = function () {
  this.subtotal = this.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  this.total = this.subtotal - this.discount;
  return this.total;
};

module.exports = mongoose.model("Order", OrderSchema);
```

---

## 🔐 middleware/auth.js

```javascript
// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    // Pegar token do header Authorization
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Acesso negado. Token não fornecido.",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuário
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: "Usuário não encontrado ou inativo",
      });
    }

    // Adicionar usuário na requisição
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    res.status(500).json({ error: "Erro na autenticação" });
  }
};

module.exports = auth;
```

---

## 🔑 routes/auth.js

```javascript
// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Função para gerar JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// POST /api/auth/register - Cadastrar novo usuário
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("Nome deve ter no mínimo 3 caracteres"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("E-mail é obrigatório")
      .isEmail()
      .withMessage("E-mail inválido")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter no mínimo 6 caracteres"),
  ],
  async (req, res) => {
    try {
      // Validar erros
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      // Verificar se usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: "E-mail já cadastrado",
        });
      }

      // Criar usuário
      const user = new User({ name, email, password });
      await user.save();

      // Gerar token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso",
        token,
        user: user.toPublicJSON(),
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      res.status(500).json({
        error: "Erro ao cadastrar usuário",
        message: error.message,
      });
    }
  }
);

// POST /api/auth/login - Login do usuário
router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("E-mail é obrigatório")
      .isEmail()
      .withMessage("E-mail inválido")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Senha é obrigatória"),
  ],
  async (req, res) => {
    try {
      // Validar erros
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Buscar usuário (incluindo senha)
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(401).json({
          error: "E-mail ou senha incorretos",
        });
      }

      // Verificar se usuário está ativo
      if (!user.isActive) {
        return res.status(401).json({
          error: "Usuário inativo",
        });
      }

      // Comparar senha
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: "E-mail ou senha incorretos",
        });
      }

      // Gerar token
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        token,
        user: user.toPublicJSON(),
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({
        error: "Erro ao fazer login",
        message: error.message,
      });
    }
  }
);

// GET /api/auth/me - Obter dados do usuário logado
router.get("/me", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.toPublicJSON(),
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({
      error: "Erro ao buscar dados do usuário",
    });
  }
});

// POST /api/auth/logout - Logout (opcional - token é gerenciado no frontend)
router.post("/logout", auth, (req, res) => {
  res.json({
    success: true,
    message: "Logout realizado com sucesso",
  });
});

module.exports = router;
```

---

## 🛒 routes/orders.js

```javascript
// routes/orders.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// POST /api/orders - Criar novo pedido
router.post(
  "/",
  auth,
  [
    body("items")
      .isArray({ min: 1 })
      .withMessage("Pedido deve ter pelo menos 1 item"),
    body("items.*.productId").isInt().withMessage("ID do produto inválido"),
    body("items.*.name")
      .notEmpty()
      .withMessage("Nome do produto é obrigatório"),
    body("items.*.price").isFloat({ min: 0 }).withMessage("Preço inválido"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantidade deve ser no mínimo 1"),
  ],
  async (req, res) => {
    try {
      // Validar erros
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const { items, paymentMethod, shippingAddress } = req.body;

      // Criar pedido
      const order = new Order({
        userId: req.userId,
        items,
        paymentMethod,
        shippingAddress,
      });

      // Calcular total
      order.calculateTotal();

      // Salvar pedido
      await order.save();

      // Popular dados do usuário
      await order.populate("userId", "name email");

      res.status(201).json({
        success: true,
        message: "Pedido criado com sucesso",
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          items: order.items,
          subtotal: order.subtotal,
          discount: order.discount,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt,
        },
      });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res.status(500).json({
        error: "Erro ao criar pedido",
        message: error.message,
      });
    }
  }
);

// GET /api/orders - Listar pedidos do usuário
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { userId: req.userId };

    // Filtrar por status se fornecido
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalOrders: count,
    });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({
      error: "Erro ao listar pedidos",
      message: error.message,
    });
  }
});

// GET /api/orders/:id - Detalhes de um pedido
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado",
      });
    }

    // Verificar se o pedido pertence ao usuário
    if (order.userId._id.toString() !== req.userId.toString()) {
      return res.status(403).json({
        error: "Acesso negado a este pedido",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({
      error: "Erro ao buscar pedido",
      message: error.message,
    });
  }
});

// PUT /api/orders/:id - Atualizar status do pedido (apenas para admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado",
      });
    }

    // Verificar se o pedido pertence ao usuário
    if (order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        error: "Acesso negado a este pedido",
      });
    }

    // Usuário só pode cancelar pedidos pendentes
    if (status === "cancelled" && order.status === "pending") {
      order.status = status;
      await order.save();

      return res.json({
        success: true,
        message: "Pedido cancelado com sucesso",
        order,
      });
    }

    res.status(400).json({
      error: "Não é possível alterar este pedido",
    });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({
      error: "Erro ao atualizar pedido",
      message: error.message,
    });
  }
});

// DELETE /api/orders/:id - Cancelar pedido
router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado",
      });
    }

    // Verificar se o pedido pertence ao usuário
    if (order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        error: "Acesso negado a este pedido",
      });
    }

    // Só pode cancelar pedidos pendentes
    if (order.status !== "pending") {
      return res.status(400).json({
        error: "Apenas pedidos pendentes podem ser cancelados",
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({
      success: true,
      message: "Pedido cancelado com sucesso",
      order,
    });
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    res.status(500).json({
      error: "Erro ao cancelar pedido",
      message: error.message,
    });
  }
});

module.exports = router;
```

---

## 🌐 Frontend - src/services/api.js (A ser criado)

```javascript
// src/services/api.js
class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    this.token = localStorage.getItem("authToken");
  }

  // Helper para fazer requests
  async request(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro na requisição");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // AUTH
  async register(userData) {
    const data = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" });
    this.removeToken();
  }

  async getMe() {
    return await this.request("/auth/me");
  }

  // ORDERS
  async createOrder(orderData) {
    return await this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/orders?${queryString}`);
  }

  async getOrder(id) {
    return await this.request(`/orders/${id}`);
  }

  async cancelOrder(id) {
    return await this.request(`/orders/${id}`, {
      method: "DELETE",
    });
  }

  // TOKEN MANAGEMENT
  setToken(token) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export const apiService = new ApiService();
```

---

## 🔄 Integração ProfileMenu.js

```javascript
// Importar no topo do arquivo
import { apiService } from '../services/api.js';

// Atualizar método handleSignup
async handleSignup(e) {
  e.preventDefault();

  const form = e.target;
  const password = form.querySelector('input[name="password"]').value;
  const confirmPassword = form.querySelector('input[name="password-confirm"]').value;

  // Validar senhas
  if (password !== confirmPassword) {
    alert('As senhas não coincidem');
    return;
  }

  const userData = {
    name: form.querySelector('input[name="name"]').value,
    email: form.querySelector('input[name="email"]').value,
    password: password,
  };

  try {
    const result = await apiService.register(userData);

    this.closeSignupModal();
    alert('Conta criada com sucesso!');

    // Atualizar estado do usuário no frontend
    this.currentUser = result.user;
    this.updateUIForLoggedUser();

  } catch (error) {
    alert(error.message || 'Erro ao criar conta. Tente novamente.');
  }
}

// Novo método para finalizar compra
async checkout() {
  if (!apiService.isAuthenticated()) {
    alert('Faça login para finalizar a compra');
    return;
  }

  const orderData = {
    items: this.cartItems,
    paymentMethod: 'credit_card',
  };

  try {
    const result = await apiService.createOrder(orderData);

    alert(`Pedido ${result.order.orderNumber} criado com sucesso!`);

    // Limpar carrinho
    this.cartItems = [];
    this.renderBagContent();

  } catch (error) {
    alert(error.message || 'Erro ao finalizar compra');
  }
}
```

---

## 📝 Variáveis de Ambiente Frontend (.env.local)

```env
# API URL
VITE_API_URL=http://localhost:3000/api

# Em produção:
# VITE_API_URL=https://seu-backend.com/api
```

---

## ✅ Checklist de Implementação

### Backend Setup

- [ ] Criar pasta `backend/`
- [ ] Copiar `server.js`
- [ ] Copiar `config/database.js`
- [ ] Copiar `models/User.js`
- [ ] Copiar `models/Order.js`
- [ ] Copiar `middleware/auth.js`
- [ ] Copiar `routes/auth.js`
- [ ] Copiar `routes/orders.js`
- [ ] Criar `.env` com variáveis
- [ ] Instalar dependências: `npm install`
- [ ] Testar: `npm run dev`

### Frontend Integration

- [ ] Criar `src/services/api.js`
- [ ] Importar em `ProfileMenu.js`
- [ ] Atualizar método `handleSignup`
- [ ] Adicionar método `checkout`
- [ ] Criar `.env.local` com VITE_API_URL
- [ ] Testar fluxo completo

### Testing

- [ ] Testar cadastro
- [ ] Testar login
- [ ] Testar criação de pedido
- [ ] Testar listagem de pedidos
- [ ] Testar tratamento de erros

---

**Data de criação:** 04/11/2025  
**Última atualização:** 04/11/2025  
**Status:** Pronto para implementação

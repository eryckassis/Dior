# 📮 Guia Postman - Dior Authentication API

## 🎯 Importar a Coleção

1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Selecione o arquivo `Dior_Authentication_API.postman_collection.json`
4. A coleção será importada com todos os 8 endpoints prontos para teste

## 🔧 Configurar Ambiente (Opcional)

A coleção já vem com a variável `base_url` configurada para `http://localhost:5000`.

Se quiser criar um ambiente customizado:

1. Clique em **Environments** (painel esquerdo)
2. Crie um novo ambiente chamado "Dior Local"
3. Adicione as variáveis:
   - `base_url` → `http://localhost:5000`
   - `access_token` → (será preenchido automaticamente)
   - `refresh_token` → (será preenchido automaticamente)

## 📋 Ordem Recomendada de Testes

### 1. **Health Check** ✅

- Verifica se o servidor está rodando
- Não requer autenticação

```bash
GET http://localhost:5000/health
```

**Resposta esperada:**

```json
{
  "status": "ok",
  "timestamp": "2024-11-19T...",
  "environment": "development",
  "uptime": 123.45
}
```

---

### 2. **Register User** 📝

- Cria um novo usuário
- Tokens são salvos automaticamente nas variáveis do ambiente

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "password": "Senha@123",
  "confirmPassword": "Senha@123"
}
```

**Resposta esperada (201 Created):**

```json
{
  "success": true,
  "message": "Usuário registrado com sucesso. Verifique seu email.",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "João Silva",
      "email": "joao.silva@example.com",
      "isEmailVerified": false,
      "createdAt": "2024-11-19T..."
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Validações:**

- Nome: 3-100 caracteres
- Email: formato válido
- Senha: mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 especial (@$!%\*?&)
- Rate Limit: 3 requisições/hora

---

### 3. **Login** 🔐

- Autentica usuário existente
- Tokens são salvos automaticamente

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "macacos@gmail.com",
  "password": "Modern12@"
}
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "uuid",
      "name": "cyberpunk",
      "email": "macacos@gmail.com",
      "isEmailVerified": false
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Rate Limit:** 5 requisições a cada 15 minutos

---

### 4. **Get Current User** 👤

- Retorna dados do usuário autenticado
- **REQUER:** Bearer Token no Authorization header

```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer {{access_token}}
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "cyberpunk",
    "email": "macacos@gmail.com",
    "isEmailVerified": false,
    "createdAt": "2024-11-19T..."
  }
}
```

---

### 5. **Refresh Access Token** 🔄

- Gera novo Access Token quando expirar (15 minutos)

```bash
POST http://localhost:5000/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "{{refresh_token}}"
}
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "data": {
    "accessToken": "novo_token_aqui"
  }
}
```

---

### 6. **Logout** 🚪

- Invalida o Refresh Token
- **REQUER:** Bearer Token

```bash
POST http://localhost:5000/api/auth/logout
Authorization: Bearer {{access_token}}
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

### 7. **Forgot Password** 📧

- Solicita redefinição de senha
- Envia email com token (válido por 1 hora)

```bash
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "macacos@gmail.com"
}
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "message": "Email de recuperação enviado com sucesso"
}
```

---

### 8. **Reset Password** 🔑

- Redefine senha usando token do email

```bash
POST http://localhost:5000/api/auth/reset-password
Content-Type: application/json

{
  "token": "token_do_email",
  "password": "NovaSenha@123",
  "confirmPassword": "NovaSenha@123"
}
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "message": "Senha redefinida com sucesso"
}
```

---

### 9. **Verify Email** ✉️

- Verifica email do usuário

```bash
GET http://localhost:5000/api/auth/verify-email/:token
```

**Resposta esperada (200 OK):**

```json
{
  "success": true,
  "message": "Email verificado com sucesso"
}
```

---

## 🔒 Segurança Implementada

### Rate Limiting

- **Geral:** 100 requisições a cada 15 minutos
- **Login:** 5 requisições a cada 15 minutos
- **Register:** 3 requisições por hora

### Proteções

- ✅ Helmet (headers de segurança)
- ✅ CORS configurado
- ✅ Validação Joi
- ✅ Hashing bcrypt (12 rounds)
- ✅ JWT com expiração
- ✅ Proteção contra brute force (account locking após 5 falhas)

---

## 🧪 Testes Automatizados

A coleção inclui **scripts automáticos** que:

1. **Salvam tokens automaticamente** após Login/Register
2. **Atualizam access_token** após Refresh
3. **Facilitam testes em sequência**

---

## ❌ Códigos de Erro Comuns

| Código | Significado                              |
| ------ | ---------------------------------------- |
| 400    | Bad Request - Dados inválidos            |
| 401    | Unauthorized - Token inválido/expirado   |
| 403    | Forbidden - Email não verificado         |
| 404    | Not Found - Recurso não encontrado       |
| 409    | Conflict - Email já cadastrado           |
| 422    | Unprocessable Entity - Validação falhou  |
| 423    | Locked - Conta bloqueada por tentativas  |
| 429    | Too Many Requests - Rate limit excedido  |
| 500    | Internal Server Error - Erro no servidor |

---

## 📊 Exemplo de Fluxo Completo

```bash
1. Health Check → Confirma API online
2. Register → Cria usuário + recebe tokens
3. Get Me → Valida autenticação
4. Logout → Invalida tokens
5. Login → Autentica novamente
6. Forgot Password → Solicita reset
7. Reset Password → Define nova senha
8. Login (nova senha) → Confirma alteração
```

---

## 🎓 Dicas

1. **Automate token management**: Os scripts Postman já fazem isso!
2. **Teste Rate Limiting**: Faça múltiplas requisições rápidas
3. **Teste validações**: Envie dados inválidos propositalmente
4. **Teste expiração**: Aguarde 15 minutos e use /me
5. **Use Collections Runner**: Execute todos os testes de uma vez

---

## 🐛 Troubleshooting

### "Failed to fetch"

- ✅ Confirme que backend está rodando em `http://localhost:5000`
- ✅ Verifique CORS no console do navegador

### "401 Unauthorized"

- ✅ Access Token pode ter expirado (15 minutos)
- ✅ Use `/refresh` para obter novo token

### "429 Too Many Requests"

- ✅ Rate limit atingido, aguarde 15 minutos
- ✅ Ou reinicie o servidor (npm run dev)

### "422 Validation Error"

- ✅ Verifique formato dos dados
- ✅ Senha deve ter: 8+ chars, maiúscula, minúscula, número, especial

---

## 📝 Notas de Segurança

⚠️ **Ambiente de Desenvolvimento:**

- Secrets estão no `.env` (nunca commitar!)
- CORS permite apenas `http://localhost:3000`
- Tokens têm expiração curta (15min access, 7d refresh)

🔐 **Para Produção:**

- Use variáveis de ambiente seguras
- Configure CORS apenas para domínios autorizados
- Habilite HTTPS
- Configure logs adequados
- Implemente monitoramento

---

**Pronto para testar! 🚀**

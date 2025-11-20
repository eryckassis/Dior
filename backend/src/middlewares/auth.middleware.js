import { JwtUtil } from "../utils/jwt.js";
import { ApiResponse } from "../utils/response.js";

export class AuthMiddleware {
  static authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return ApiResponse.unauthorized(
          res,
          "Token de autenticação não fornecido. Por favor, faça login"
        );
      }
      const parts = authHeader.split(" ");
      if (parts.length !== 2 || parts[0] !== "Bearer") {
        return ApiResponse.unauthorized(
          res,
          "Formato de token inválido. Use: Bearer <token>"
        );
      }

      const token = parts[1];
      const decoded = JwtUtil.verifyAccessToken(token);

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
      };

      next();
    } catch (error) {
      console.error("Erro na autenticação:", error.message);
      if (error.message.includes("expirado")) {
        return ApiResponse.tokenExpired(res);
      }

      if (error.message.includes("inválido")) {
        return ApiResponse.tokenInvalid(res);
      }

      return ApiResponse.unauthorized(
        res,
        "Falha na autenticação. Token inválido"
      );
    }
  }

  // Middleware opcional - permite acesso com ou sem autenticação
  // Útil para rotas que têm comportamento diferente para usuários logados
  static optionalAuth(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        req.user = null;
        return next();
      }

      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        const token = parts[1];
        const decoded = JwtUtil.verifyAccessToken(token);

        req.user = {
          userId: decoded.userId,
          email: decoded.email,
        };
      } else {
        req.user = null;
      }

      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}

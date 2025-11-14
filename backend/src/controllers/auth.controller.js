import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/response";

export class AuthController {
  static async resgister(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register({ name, email, password });
      return ApiResponse.created(
        res,
        { user },
        "Conta criada com sucesso! Bem vindo(a) ao Dior."
      );
    } catch (error) {
      console.error("X Erro de registro:", error);

      if (error.message.includes("Já cadastrado")) {
        return ApiResponse.conflict(res, error.message);
      }
      return ApiResponse.internalError(
        res,
        "Erro ao criar conta. Tente Novamente.",
        error
      );
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return ApiResponse.success(
        res,
        result,
        "Login realizado com sucesso! Bem vindo(a) de volta."
      );
    } catch (error) {
      console.error("X Erro no login:", error);

      if (
        error.message.includes("incorretos") ||
        error.message.includes("tentativa")
      ) {
        return ApiResponse.unauthorized(res, error.message);
      }
      if (error.message.includes("bloqueada")) {
        return ApiResponse.accountLocked(res);
      }
      if (error.message.includes("verifique seu e-mail")) {
        return ApiResponse.emailNotVerified(res, error.message);
      }

      if (error.message.includes("verifique seu e-mail")) {
        return ApiResponse.emailNotVerified(res, error.message);
      }
      return ApiResponse.internalError(
        res,
        "Erro ao fazer login. Tente novamente.",
        error
      );
    }
  }
}

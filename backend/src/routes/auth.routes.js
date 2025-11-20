import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import {
  loginLimiter,
  registerLimiter,
  passwordResetLimiter,
} from "../middlewares/rateLimiter.middleware.js";

/**
 * Rotas de autenticação
 * Padrão RESTful aplicado
 */

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registra novo usuário
 * @access  Public
 */
router.post(
  "/register",
  registerLimiter,
  ValidationMiddleware.validateRegister,
  AuthController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Autentica usuário e retorna tokens
 * @access  Public
 */
router.post(
  "/login",
  loginLimiter,
  ValidationMiddleware.validateLogin,
  AuthController.login
);

/**
 * @route   POST /api/auth/logout
 * @desc    Faz logout do usuário (invalida refresh token)
 * @access  Private
 */
router.post("/logout", AuthMiddleware.authenticate, AuthController.logout);

/**
 * @route   POST /api/auth/refresh
 * @desc    Atualiza access token usando refresh token
 * @access  Public
 */
router.post(
  "/refresh",
  ValidationMiddleware.validateRefreshToken,
  AuthController.refreshToken
);

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verifica email do usuário
 * @access  Public
 */
router.get("/verify-email/:token", AuthController.verifyEmail);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Envia email para reset de senha
 * @access  Public
 */
router.post(
  "/forgot-password",
  passwordResetLimiter,
  ValidationMiddleware.validateForgotPassword,
  AuthController.forgotPassword
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Redefine senha do usuário
 * @access  Public
 */
router.post(
  "/reset-password",
  ValidationMiddleware.validateResetPassword,
  AuthController.resetPassword
);

/**
 * @route   GET /api/auth/me
 * @desc    Retorna dados do usuário autenticado
 * @access  Private
 */
router.get("/me", AuthMiddleware.authenticate, AuthController.getMe);

export default router;

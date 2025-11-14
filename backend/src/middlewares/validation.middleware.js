import { ApiResponse } from "../utils/response";
import { AuthValidator } from "../validators/auth.validator";

export class ValidationMiddleware {
  static validate(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = AuthValidator.formatValidationErrors(error);
        return ApiResponse.validationError(res, errors);
      }

      req.body = value;
      next();
    };
  }
}

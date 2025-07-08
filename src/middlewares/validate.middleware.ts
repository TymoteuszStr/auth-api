import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      return next();
    }
    const error = result.error as ZodError;

    const isMissingRequiredFields = error.issues.every(
      (issue) => issue.code === 'invalid_type' && issue.received === 'undefined',
    );

    const statusCode = isMissingRequiredFields ? 400 : 422;

    res.status(statusCode).json({
      msg: 'Validation failed',
      errors: error.flatten().fieldErrors,
    });
  };
};

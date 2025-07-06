import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerSchema } from '../schemas/auth.schema.js';
import { validate } from '../middlewares/validate.middleware.js';

export const authRouter = Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(registerSchema), login);

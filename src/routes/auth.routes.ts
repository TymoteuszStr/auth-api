import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerSchema } from '../schemas/auth.schema';
import { validate } from '../middlewares/validate.middleware';

export const authRouter = Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(registerSchema), login);

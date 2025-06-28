import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password should have at least 8 characters')
    .max(64, 'Password should have at most 64 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one digit'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

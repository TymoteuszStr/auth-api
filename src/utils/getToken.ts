import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';

export function genToken(id: string, expiresIn: StringValue = '1h') {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn });
}

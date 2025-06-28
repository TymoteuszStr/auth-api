import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'User not found' });
    next();
  } catch {
    res.status(403).json({ msg: 'Invalid token' });
  }
};

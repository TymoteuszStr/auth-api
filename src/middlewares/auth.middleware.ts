import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User';

interface TokenPayload extends JwtPayload {
  id: string;
}

export const auth: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ msg: 'No token' });
    return;
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(401).json({ msg: 'User not found' });
      return;
    }

    next();
  } catch {
    res.status(403).json({ msg: 'Invalid token' });
  }
};

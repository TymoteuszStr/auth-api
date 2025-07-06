import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { genToken } from '../utils/getToken.js';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      res.status(400).json({ msg: 'Missing data' });
      return;
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409).json({ msg: 'Email taken' });
      return;
    }

    const user = await User.create({ email, password });
    res.status(201).json({ token: genToken(user.id) });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ msg: 'Invalid credentials' });
      return;
    }

    res.json({ token: genToken(user.id) });
  } catch (err) {
    next(err);
  }
};

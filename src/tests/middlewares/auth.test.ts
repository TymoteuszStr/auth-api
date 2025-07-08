import request from 'supertest';
import express from 'express';
import jwt, { Secret, type SignOptions } from 'jsonwebtoken';

import { User } from '../../../src/models/User';
import { auth } from '../../middlewares/auth.middleware';

process.env.JWT_SECRET = 'test-secret';

const signToken = (id: string, expiresIn: SignOptions['expiresIn'] = '1h') =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn });

const app = express();
app.get('/protected', auth, (_req, res) => {
  res.json({ ok: true });
});

describe('auth middleware', () => {
  afterEach(() => jest.restoreAllMocks());

  it('401 – brak tokena', () => request(app).get('/protected').expect(401, { msg: 'No token' }));

  it('403 – token uszkodzony', () =>
    request(app).get('/protected').set('Authorization', 'Bearer not.a.jwt').expect(403, { msg: 'Invalid token' }));

  it('401 – user nie istnieje', async () => {
    jest.spyOn(User, 'findById').mockReturnValue({ select: () => null } as any);

    const token = signToken('ghost');
    await request(app).get('/protected').set('Authorization', `Bearer ${token}`).expect(401, { msg: 'User not found' });
  });

  it('200 – token i user poprawni', async () => {
    jest.spyOn(User, 'findById').mockReturnValue({
      select: () => ({ id: '123', email: 'a@a.com' }),
    } as any);

    const token = signToken('123');
    await request(app).get('/protected').set('Authorization', `Bearer ${token}`).expect(200, { ok: true });
  });
});

import request from 'supertest';
import { app } from '../../../app';

describe('POST /api/login', () => {
  const register = '/api/register';
  const login = '/api/login';
  const email = 'login@test.com';
  const password = 'Secret123';

  beforeEach(async () => {
    await request(app).post(register).send({ email, password });
  });

  it('200 – valid credentials return JWT', async () => {
    const res = await request(app).post(login).send({ email, password }).expect(200);

    expect(res.body).toHaveProperty('token');
  });

  it('401 – wrong password', async () => {
    await request(app).post(login).send({ email, password: 'wrong' }).expect(401);
  });

  it('401 – unknown email', async () => {
    await request(app).post(login).send({ email: 'no@user.com', password }).expect(401);
  });
  it('422 – wrong email', async () => {
    await request(app).post(login).send({ email: 'er.com', password }).expect(422);
  });
});

import request from 'supertest';
import { app } from '../../../app';

describe('POST /api/register', () => {
  const route = '/api/register';
  const email = 'test@example.com';
  const password = 'Passw0rd!';

  it('201 – returns JWT on success', async () => {
    const res = await request(app).post(route).send({ email, password }).expect(201);

    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('409 – duplicate email', async () => {
    await request(app).post(route).send({ email, password });
    const res = await request(app).post(route).send({ email, password }).expect(409);

    expect(res.body.msg).toBe('Email taken');
  });

  it('400 – missing fields', async () => {
    await request(app).post(route).send({ email }).expect(400);
  });

  it('422 – password or email has wrong format', async () => {
    await request(app).post(route).send({ email: 'test', password }).expect(422);
  });

  it('422 – password or email has wrong format', async () => {
    await request(app).post(route).send({ email, password: 'xx' }).expect(422);
  });
});

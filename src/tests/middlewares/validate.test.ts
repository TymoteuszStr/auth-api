import express, { Request, Response } from 'express';
import request from 'supertest';
import { z } from 'zod';

import { validate } from '../../../src/middlewares/validate.middleware';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const app = express();
app.use(express.json());

app.post('/test', validate(schema), (_req: Request, res: Response) => {
  res.status(200).json({ msg: 'Passed' });
});

describe('validate middleware', () => {
  it('200 – valid input', async () => {
    await request(app)
      .post('/test')
      .send({ email: 'test@example.com', password: 'Secret123' })
      .expect(200, { msg: 'Passed' });
  });

  it('400 – missing required fields', async () => {
    const res = await request(app).post('/test').send({}).expect(400);

    expect(res.body).toHaveProperty('msg', 'Validation failed');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors).toHaveProperty('password');
  });

  it('422 – invalid field values', async () => {
    const res = await request(app).post('/test').send({ email: 'not-an-email', password: '123' }).expect(422);

    expect(res.body).toHaveProperty('msg', 'Validation failed');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors).toHaveProperty('password');
  });
});

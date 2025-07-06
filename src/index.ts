import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db';
import { authRouter } from './routes/auth.routes';

const app = express();
app.use(express.json());
app.use('/api', authRouter);

console.log('ENV-DEBUG  ➜  MONGODB_URI =', process.env.MONGODB_URI ?? '<undefined>');
console.log('ENV-DEBUG  ➜  wszystkie klucze:', Object.keys(process.env));

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});

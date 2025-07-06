import express from 'express';
import { connectDB } from './config/db';
import { authRouter } from './routes/auth.routes';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  import('dotenv/config');
}
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', authRouter);

console.log('ENV-DEBUG  ➜  MONGODB_URI =', process.env.MONGODB_URI ?? '<undefined>');
console.log('ENV-DEBUG  ➜  wszystkie klucze:', Object.keys(process.env));

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});

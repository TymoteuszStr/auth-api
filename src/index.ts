import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db';

const app = express();
app.use(express.json());

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});

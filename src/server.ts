import { app } from './app';
import { connectDB } from './config/db';

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});

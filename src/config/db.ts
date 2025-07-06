import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri as string, {
      serverSelectionTimeoutMS: 5_000,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Mongo error:', err);
    throw err;
  }
};

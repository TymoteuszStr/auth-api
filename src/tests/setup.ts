import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

jest.setTimeout(30_000);

process.env.JWT_SECRET ??= 'test-secret';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

beforeEach(async () => {
  const db = mongoose.connection.db;
  if (db) {
    await db.dropDatabase();

    const models = mongoose.modelNames();
    await Promise.all(models.map((name) => mongoose.model(name).ensureIndexes()));
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

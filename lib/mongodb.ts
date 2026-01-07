import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set in environment variables');
}

type MongoCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongo = global as typeof globalThis & {
  _mongoCache?: MongoCache;
};

let cached: MongoCache = globalWithMongo._mongoCache || { conn: null, promise: null };

if (!globalWithMongo._mongoCache) {
  globalWithMongo._mongoCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri: string = MONGODB_URI!;
    cached.promise = mongoose.connect(uri, {
      dbName: 'note',
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

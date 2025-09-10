// // frontend/lib/db.ts
// import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL as string;

// if (!MONGODB_URL) {
//   throw new Error("Please add MONGODB_URI to your .env file");
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URL, {
//       dbName: "evently",
//     }).then((mongoose) => mongoose);
//   }
//   console.log("mongo connected")
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "evently" });
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
}

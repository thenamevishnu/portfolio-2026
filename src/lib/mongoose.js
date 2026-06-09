import mongoose from "mongoose";

const mongodb_url = process.env.NEXT_PUBLIC_MONGODB_URI;
const mongodb_db_name = process.env.NEXT_PUBLIC_MONGODB_DB_NAME;

if(!mongodb_url || !mongodb_db_name) {
    throw new Error("MONGODB_URI and MONGODB_DB_NAME environment variables are required");
}

let cached = global.mongoose || null;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

export const db = {
    connect: async () => {
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            cached.promise = mongoose.connect(mongodb_url, { dbName: mongodb_db_name });
        }
        try {
            cached.conn = await cached.promise;
        } catch (e) {
            cached.promise = null;
            throw e;
        }
        return cached.conn;
    }
}

import { MongoClient } from "mongodb"

const uri = process.env.DATABASE_URL

if (!uri) {
  throw new Error("DATABASE_URL is not set")
}

const globalForMongo = globalThis as unknown as {
  mongoClientPromise: Promise<MongoClient> | undefined
}

const clientPromise =
  globalForMongo.mongoClientPromise ?? new MongoClient(uri).connect()

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClientPromise = clientPromise
}

export default clientPromise

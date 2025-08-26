import { MongoClient, ServerApiVersion } from "mongodb";

// Global variable to store the MongoDB client
let client;
let clientPromise;

// Check if we're in a build context
const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" ||
  (process.env.NODE_ENV === "production" && !process.env.VERCEL);
const missingEnvVars = !process.env.MONGODB_URI || !process.env.DB_Name;

// Handle missing environment variables gracefully
if (missingEnvVars && !isBuildTime) {
  console.warn(
    "Warning: MongoDB environment variables are missing. Database operations will not work."
  );
  console.warn("Please add MONGODB_URI and DB_Name to your .env.local file");
}

// Initialize client promise based on context
if (isBuildTime || missingEnvVars) {
  // During build time or when env vars are missing, create a mock client
  clientPromise = Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: () => Promise.resolve(null),
        find: () => ({
          limit: () => ({
            toArray: () => Promise.resolve([]),
          }),
          toArray: () => Promise.resolve([]),
        }),
        insertOne: () => Promise.resolve({ insertedId: null }),
        updateOne: () => Promise.resolve({ modifiedCount: 0 }),
        deleteOne: () => Promise.resolve({ deletedCount: 0 }),
      }),
    }),
  });
} else {
  // Normal database connection setup when environment variables are available
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(process.env.MONGODB_URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = client.connect();
  }
}

export function dbConnect(collectionName) {
  return clientPromise.then((client) => {
    return client
      .db(process.env.DB_Name || "defaultDB")
      .collection(collectionName);
  });
}

// Export a default connection for general use
export default clientPromise;

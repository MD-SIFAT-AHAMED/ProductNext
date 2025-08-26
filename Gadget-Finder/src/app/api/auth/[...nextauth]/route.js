import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient, ServerApiVersion } from "mongodb";

// Check if we're in a build context
const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" ||
  (process.env.NODE_ENV === "production" && !process.env.VERCEL);

// Check for missing environment variables
const missingMongoUri = !process.env.MONGODB_URI;
const missingGoogleCredentials =
  !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET;
const missingNextAuthSecret = !process.env.NEXTAUTH_SECRET;

// Handle missing environment variables gracefully
if (missingMongoUri && !isBuildTime) {
  console.warn(
    "Warning: MONGODB_URI environment variable is missing. Database sessions will not work."
  );
  console.warn("Please add MONGODB_URI to your environment variables");
}

if (missingGoogleCredentials && !isBuildTime) {
  console.warn(
    "Warning: Google OAuth credentials are missing. Google login will not work."
  );
  console.warn(
    "Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your environment variables"
  );
}

if (missingNextAuthSecret && !isBuildTime) {
  console.warn(
    "Warning: NEXTAUTH_SECRET is missing. This is required for production."
  );
  console.warn("Please add NEXTAUTH_SECRET to your environment variables");
}

// MongoDB client for NextAuth adapter
let client;
let clientPromise;

if (isBuildTime || missingMongoUri) {
  // During build time or when env vars are missing, create a mock client promise
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
        createIndex: () => Promise.resolve(),
        dropIndex: () => Promise.resolve(),
      }),
    }),
    close: () => Promise.resolve(),
  });
} else {
  // Normal MongoDB client setup when environment variables are available
  client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export const authOptions = {
  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // Database adapter for session storage - only use if MongoDB is available
  ...(!isBuildTime && !missingMongoUri
    ? { adapter: MongoDBAdapter(clientPromise) }
    : {}),

  // Session configuration
  session: {
    strategy: !isBuildTime && !missingMongoUri ? "database" : "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Custom pages
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },

  // Callbacks for customizing behavior
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow sign in
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to products page after successful sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      // Default redirect to /Products after successful authentication
      return `${baseUrl}/Products`;
    },

    async session({ session, user }) {
      // Add user id to session
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    },

    async jwt({ token, user, account }) {
      // Add user info to JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  // Events for logging
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in with ${account?.provider}`);
    },
    async signOut({ session, token }) {
      console.log(`User signed out`);
    },
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

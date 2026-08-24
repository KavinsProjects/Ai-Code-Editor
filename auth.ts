import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import authConfig from "./auth.config";
import clientPromise from "./lib/mongodb";
import { getUserById } from "./modules/action";
import type { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account || !user.email) {
        return false;
      }
      // Let the MongoDB adapter handle user and account creation
      // Just return true to allow sign-in
      return true;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role as UserRole;

      return token;
    },

    async session({ session, token, user }) {
      const userId = user?.id ?? token?.sub;

      // Attach user ID to session
      if (userId && session.user) {
        session.user.id = userId;
      }

      // Attach user role to session
      const role = (user as { role?: UserRole } | undefined)?.role ?? token?.role;
      if (role && session.user) {
        session.user.role = role as UserRole;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,

  adapter: MongoDBAdapter(clientPromise),

  ...authConfig,
});
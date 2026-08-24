import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./modules/action";
import type { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account || !user.email) {
        return false;
      }
      // Let PrismaAdapter handle user and account creation
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

    async session({ session, token }) {
      // Attach user ID to session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Attach user role to session
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,

  adapter: PrismaAdapter(db),

  ...authConfig,
});
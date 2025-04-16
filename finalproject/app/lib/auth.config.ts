import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized() {
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

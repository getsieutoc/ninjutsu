import NextAuth, { type NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/utils/prisma';

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.FACEBOOK_CLIENT_ID ||
  !process.env.FACEBOOK_CLIENT_SECRET ||
  !process.env.NEXTAUTH_SECRET
) {
  throw new Error('Environment variables are not defined');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: async ({ session, user }) => {
      if (user) {
        return {
          ...session,
          user: {
            ...session.user,
            ...user,
          },
        };
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);

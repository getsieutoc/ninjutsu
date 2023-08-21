import NextAuth, { type NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/utils/prisma';

// if (
//   !process.env.GOOGLE_CLIENT_ID ||
//   !process.env.GOOGLE_CLIENT_SECRET ||
//   !process.env.FACEBOOK_CLIENT_ID ||
//   !process.env.FACEBOOK_CLIENT_SECRET ||
//   !process.env.NEXTAUTH_SECRET
// ) {
//   throw new Error('Environment variables are not defined');
// }

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/signin',
  },

  callbacks: {
    // Due to the fact that we extend the next-auth's Session type in next-auth.d.ts
    // the Session's User type here is actually the DefaultSession['user'] with basic properties
    // like `name`, 'email' and 'image' only! That's why we have to add `id` and `role` here.
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          // role: user.role ?? '',
        },
      };
    },
  },
};

export default NextAuth(authOptions);

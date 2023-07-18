import { COOKIE_DOMAIN, IS_VERCEL, SESSION_NAME } from '@/utils/constants';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '@/utils/prisma';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
  throw new Error('Providers env variables are not defined');
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not defined');
}

export const authOptions: NextAuthOptions = {
  adapter: {
    ...PrismaAdapter(prisma),
    createUser(data) {
      return prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
    },
  },
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

  pages: {
    signIn: '/login',
    verifyRequest: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },

  cookies: {
    sessionToken: {
      name: SESSION_NAME,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: IS_VERCEL,
        domain: COOKIE_DOMAIN,
      },
    },
  },
};

export default NextAuth(authOptions);

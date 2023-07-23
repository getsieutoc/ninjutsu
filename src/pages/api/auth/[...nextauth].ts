import { COOKIE_DOMAIN, IS_VERCEL, SESSION_NAME } from '@/utils/constants';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
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

  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
};

export default NextAuth(authOptions);

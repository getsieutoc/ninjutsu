import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { JWT_MAX_AGE } from '@/utils/constants';
import { exclude } from '@/utils/parsers';
import { verify } from '@/utils/password';
import { prisma } from '@/configs/prisma';
import { UserRole } from '@/types';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET variable is not defined');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Credentials are required');
          }

          const { email, password: rawPassword } = credentials;

          // This object returned will be saved in `user` property of the JWT
          // that's why we should keep it named `user` for easier debuging
          const user = await prisma.user.findUnique({
            where: { email },
          });

          const isValidPassword = await verify(rawPassword, user?.password);

          if (user && isValidPassword) {
            return exclude(user, 'password');
          }

          return null;
        } catch (error) {
          throw new Error('Failed to login', { cause: error });
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    verifyRequest: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },

  session: {
    strategy: 'jwt',
    maxAge: JWT_MAX_AGE,
  },

  callbacks: {
    // NOTE: The `profile` and `user` object is only visible at the login phase for oauth type.
    // On Credentials type, only `account` and `user` object is visible at login
    // How this works: On the first login, the shape of token is really simple { name, email, sub, picture }
    // but we have info inside account (simple form because this is credentials), user (returned from authorize callback)
    // we dont have value in `profile` because it only from OAuth like login by Google/Facebook
    jwt: async ({ token, account, profile, user }) => {
      if (profile && account && account.type === 'oauth') {
        return {
          ...token,
          accessToken: account.access_token,
          googleProfileId: profile.sub,
          role: UserRole.USER,
        };
      }

      // Only trigger at the login phase. In here, we merge them back.
      if (user && account && account.type === 'credentials') {
        return {
          ...token, // has poor information
          ...user, // has rich user information
        };
      }

      return token;
    },

    // https://github.com/nextauthjs/next-auth/blob/main/docs/docs/guides/03-basics/refresh-token-rotation.md
    // The `token` is the object return from `jwt` callback. The `session.user` object, again, is the default value
    // from the `token` we see inside jwt callback. Because of that, it's good to merge them.
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}

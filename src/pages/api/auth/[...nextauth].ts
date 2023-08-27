import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { UserRole } from '@/types';
import { prisma } from '@/utils/prisma';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET variable is not defined');
}

export const authOptions: NextAuthOptions = {
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

          const { email, password } = credentials;

          // This object returned will be saved in `user` property of the JWT
          // that's why we should keep it named `user`
          const user = {
            ...response,
            name: `${response.firstName} ${response.lastName}`,
          };

          return user ?? null;
        } catch (error) {
          throw new Error(`Failed to login: ${error}`);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
    verifyRequest: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },

  callbacks: {
    redirect: ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },

    signIn: ({ account }) => {
      if (account?.type === 'credentials') {
        return !!account?.providerAccountId;
      }

      throw new Error(
        'Your account is invalid. Please contact Lakihelppi support'
      );
    },

    // NOTE: The `profile` and `user` object is only visible at the login phase for oauth type.
    // On Credentials type, only `account` and `user` object is visible at login
    // How this works: On the first login, the shape of token is really simple { name, email, sub, picture }
    // but we have info inside account (simple form because this is credentials), user (returned from authorize callback)
    // we dont have value in `profile` because it only from OAuth like login by Google/Facebook
    jwt: async ({ token, account, profile, user }) => {
      // Still dont understand where the fuck they get the `token` from, I guess it is default with empty value
      // then they fill up with assumption of `user` object we return from `authorize` callback.
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
          ...token,
          ...user,
          // enabledFeatures = user.enabledFeatures;
        };
      }

      if (Date.now() - (token.iat as number) * 1000 < ms('1m')) {
        const response = await httpClient.post(
          `${SERVER_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          }
        );

        return {
          ...token,
          ...response,
        };
      }

      return token;
    },

    // https://github.com/nextauthjs/next-auth/blob/main/docs/docs/guides/03-basics/refresh-token-rotation.md
    // The `token` is the object return from `jwt` callback. The `session.user` object, again, is the default value
    // from the `token` we see inside jwt callback. Because of that, it's good to merge them.
    session: async ({ session, token, user }) => {
      // TODO: Rewrite when making the oauth login
      if (user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            googleProfileId: token.googleProfileId,
            role: token.role as UserRole,
            enabledFeatures: token.enabledFeatures,
          },
        };
      }

      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
          },
        };
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);

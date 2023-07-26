// eslint-disable-next-line
import NextAuth, { DefaultSession } from 'next-auth';
import type { User as PrismaUser, UserRole } from '@prisma/client';

declare module 'next-auth/adapters' {
  interface AdapterUser extends PrismaUser {}
}

declare module 'next-auth/core/types' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: UserRole;
    };
  }
}

// eslint-disable-next-line
import NextAuth, { DefaultSession } from 'next-auth';
import type { Prisma, User as PrismaUser, UserRole } from '@prisma/client';

declare module 'next-auth/adapters' {
  interface AdapterUser extends PrismaUser {}
}

declare module 'next-auth/core/types' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: UserRole;
      preferences: Prisma.JsonObject;
    };
  }
}

// eslint-disable-next-line
import NextAuth from 'next-auth';
import type { User } from '@prisma/client';

// These interfaces will be merged with existing interfaces from NextAuth
declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }

  interface AuthUser extends User {}
}

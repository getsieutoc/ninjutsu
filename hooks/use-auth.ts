import { useSession } from 'next-auth/react';
import { UserRole } from '@/types';

export type UseAuthOptions = Parameters<typeof useSession>[0];

export const useAuth = (options?: UseAuthOptions) => {
  const { data: session, status, ...rest } = useSession(options);

  const isAdmin = session?.user.role === UserRole.ADMIN;
  const isAuthenticated = !!session && status === 'authenticated';

  return { ...rest, session, status, isAdmin, isAuthenticated };
};

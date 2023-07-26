import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserRole } from '@/types';

export type UseAuthOptions = {
  /**
   * Specify a path to be redirected to when not login
   */
  redirectTo?: string;

  /**
   * The current page should be protected
   */
  required?: boolean;
};

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: !!options?.required,
    onUnauthenticated() {
      if (!router.pathname.endsWith('/login')) {
        const redirectTo = router.asPath !== '/login' ? `?redirect=${router.asPath}` : '';
        router.push(options?.redirectTo ?? `/login${redirectTo}`);
      }
    },
  });

  const isAdmin = session?.user.role === UserRole.ADMIN;
  const isAuthenticated = !!session && status === 'authenticated';

  return { session, status, isAdmin, isAuthenticated };
};

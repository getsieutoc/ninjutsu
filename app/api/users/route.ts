import { createUser, queryUsers } from '@/services/users';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { withRateLimit } from '@/utils/rateLimit';

export const GET = withRateLimit(async (req, res) => {
  // const session = await getServerSession(req, res, authOptions);
  const session = await getServerSession(authOptions);
  return queryUsers(req, res, session);
});
export const POST = withRateLimit(async (req: Request, res) => {
  return createUser(req, res);
});

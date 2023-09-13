import { createUser, queryUsers, updateUser } from '@/services/users';
import { getSession } from '@/utils/auth';
import { withRateLimit } from '@/utils/rateLimit';

export const GET = withRateLimit(async (req, res) => {
  const session = await getSession();
  return queryUsers(req, res, session);
});
export const POST = withRateLimit(async (req: Request, res) => {
  return createUser(req, res);
});

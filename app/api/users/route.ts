import { createUser, queryUsers, updateUser } from '@/services/users';
import { getSession } from '@/utils/auth';
import { withRateLimit } from '@/utils/rateLimit';
import { NextApiResponse } from 'next';
import { type User } from '@prisma/client';

export const GET = withRateLimit(async (req, res) => {
  const session = await getSession();
  return queryUsers(req, res, session);
});
export const POST = withRateLimit(async (req: Request, res) => {
  return createUser(req, res);
});
export const PATCH = withRateLimit(
  async (req: Request, res: NextApiResponse<Omit<User, 'password'>>) => {
    const session = await getSession();
    return await updateUser(req, res, session);
  }
);

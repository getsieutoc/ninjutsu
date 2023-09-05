import type { NextApiRequest, NextApiResponse } from 'next';
import { exclude, parseQuery } from '@/utils/parsers';
import { type User, UserRole } from '@prisma/client';
import { type Session } from 'next-auth';
import { prisma } from '@/utils/prisma';
import { hash } from '@/utils/password';

// export type UserWithPayload = Prisma.UserGetPayload<>;
export const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'>>,
  session: Session | null
) => {
  try {
    if (!session) {
      return res.status(403).end();
    }

    const { id } = req.query;

    const result = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
    });

    return res.status(200).send(exclude(result, 'password'));
  } catch (error) {
    return res.status(500).end(error);
  }
};

export const queryUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'>[]>,
  session: Session | null
) => {
  try {
    if (!session) {
      return res.status(403).end();
    }

    const role = session.user.role;
    const { skip, take, s = '' } = req.query;

    // Most likely this is blocked from frontend, but just in case...
    if (role === UserRole.USER || role === UserRole.AUTHOR) {
      return res.status(200).send([]);
    }

    const managerFilters = () => {
      if (role === UserRole.MANAGER) {
        return {
          managers: {
            some: {
              id: session.user.id,
            },
          },
        };
      }

      return undefined;
    };

    const results = await prisma.user.findMany({
      skip: parseQuery(skip),
      take: parseQuery(take),
      where: {
        ...managerFilters(),
        ...(s ? { name: { search: s as string } } : {}),
      },
    });

    return res.status(200).send(results.map((o) => exclude(o, 'password')));
  } catch (error) {
    return res.status(500).end(error);
  }
};

export const updateUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'>>,
  session: Session | null
) => {
  try {
    if (!session) {
      return res.status(403).end();
    }

    const role = session.user.role;
    let { id } = req.query;

    // Normal user can only update their own account
    if (role === UserRole.USER || role === UserRole.AUTHOR) {
      id = session.user.id;
    }

    const result = await prisma.user.update({
      where: { id: id as string },
      data: JSON.parse(req.body),
    });

    return res.status(200).json(exclude(result, 'password'));
  } catch (error) {
    return res.status(500).end(error);
  }
};

// TODO: implement rate limit on the next PR
export const createUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'>>
) => {
  try {
    const { name, email, password } = req.body as Pick<
      User,
      'name' | 'email' | 'password'
    >;

    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const found = await prisma.user.findUnique({
      where: { email },
    });

    if (found) {
      throw new Error('Email already in use');
    }

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });

    return res.status(200).json(exclude(result, 'password'));
  } catch (error) {
    return res.status(500).end(error);
  }
};

export const deleteUser = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  return res.status(200).json({});
};

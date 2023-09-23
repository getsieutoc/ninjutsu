'use server';
// import 'server-only';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { exclude, parseQuery } from '@/utils/parsers';
import { type User, UserRole, Prisma } from '@prisma/client';
import { type Session } from 'next-auth';
import { prisma } from '@/configs/prisma';
import { hash } from '@/utils/password';
import { getSession } from '@/configs/auth';

// export type UserWithPayload = Prisma.UserGetPayload<>;
export const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'>>,
  session: Session | null
) => {
  try {
    if (!session) {
      return NextResponse.json({ status: 403 });
    }

    const { id } = req.query;

    const result = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
    });

    return NextResponse.json({
      status: 200,
      result: exclude(result, 'password'),
    });
  } catch (error) {
    return res.status(500).end(error);
  }
};

export const queryUsers = async (
  req: Request,
  res: NextApiResponse<Omit<User, 'password'>[]>,
  session: Session | null
) => {
  try {
    if (!session) {
      return res.status(403).end();
    }

    const role = session.user.role;
    const { skip, take, s = '' } = await req.json();

    // Most likely this is blocked from frontend, but just in case...
    if (role === UserRole.USER || role === UserRole.AUTHOR) {
      return NextResponse.json({ status: 200, results: [] });
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

    return NextResponse.json({
      status: 200,
      results: results.map((o) => exclude(o, 'password')),
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  if (!id || !data) {
    throw new Error('id and data update must be request');
  }
  const currentUser = await prisma.user.findUnique({
    where: { id },
    select: {
      preferences: true,
    },
  });
  if (!currentUser) {
    throw new Error('user not found');
  }
  const { role } = session.user;
  // Normal user can only update their own account
  if (role === UserRole.USER || role === UserRole.AUTHOR) {
    id = session.user.id;
  }
  const preferences = {
    ...(currentUser.preferences as Prisma.JsonObject),
    ...(data.preferences as Prisma.JsonObject),
  };
  const result = await prisma.user.update({
    where: { id },
    data: {
      ...data,
      preferences,
    },
  });

  return exclude(result, 'password');
};

// TODO: implement rate limit on the next PR
export const createUser = async (
  req: Request,
  res: NextApiResponse<Omit<User, 'password'>>
) => {
  try {
    const { name, email, password } = (await req.json()) as Pick<
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

    const totalUser = await prisma.user.count();

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
        role: totalUser === 0 ? UserRole.ADMIN : UserRole.USER,
      },
    });

    return NextResponse.json({
      status: 200,
      result: exclude(result, 'password'),
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
};

export const deleteUser = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  return NextResponse.json({ status: 200 });
};

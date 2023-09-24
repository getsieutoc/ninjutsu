'use server';
import 'server-only';

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { exclude, paramParser } from '@/utils/parsers';
import { type User, UserRole, Prisma } from '@prisma/client';
import { type Session } from 'next-auth';
import { prisma } from '@/configs/prisma';
import { hash } from '@/utils/password';
import { getSession } from '@/configs/auth';
import deepmerge from 'deepmerge';

const richInclude = {
  pages: true,
  posts: true,
};

export type UserWithPayload = Prisma.UserGetPayload<{
  include: typeof richInclude;
}>;

export const getUser = async ({
  where,
}: {
  where: Prisma.UserWhereUniqueInput;
}) => {
  const response = await prisma.user.findUnique({
    where,
  });

  return response;
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
      skip: paramParser(skip),
      take: paramParser(take),
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

export const updateUser = async (
  id: string,
  data: Prisma.UserUncheckedUpdateInput
) => {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error('Unauthorized request');
    }

    // Only ADMIN can update every page
    const userId = session.user.role !== UserRole.ADMIN ? session.user.id : id;

    if ('preferences' in data) {
      const currentUser = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          preferences: true,
        },
      });

      data.preferences = deepmerge(
        currentUser.preferences as Prisma.JsonObject,
        data.preferences as Prisma.JsonObject
      );
    }

    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return exclude(response, 'password');
  } catch (error) {
    console.error({ error });
  }
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

'use server';

import { prisma } from '@/configs/prisma';
import { getSession } from '@/configs/auth';
import type { Page } from '@/types';

export const createPage = async (args: Prisma.PageCreateArgs) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const finalArgs = deepmerge<
    RecursivePartial<Prisma.PageCreateArgs>,
    Prisma.PageCreateArgs
  >(
    {
      data: {
        // Make sure the author is the current user
        authorId: session.user.id,
      },
    },
    args
  );

  const response = await prisma.page.create(finalArgs);

  return response;
};

export const updatePage = async (args: Prisma.PageUpdateArgs) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const finalArgs = deepmerge<
    RecursivePartial<Prisma.PageUpdateArgs>,
    Prisma.PageUpdateArgs
  >(
    {
      // Only ADMIN can update every page
      ...(session.user.role !== UserRole.ADMIN
        ? { where: { authorId: session.user.id } }
        : {}),
    },
    args
  );

  const response = await prisma.page.update(finalArgs);

  return response;
};

export const deletePage = async (args: Prisma.PageDeleteArgs) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const finalArgs = deepmerge<
    RecursivePartial<Prisma.PageDeleteArgs>,
    Prisma.PageDeleteArgs
  >(
    {
      // Only ADMIN can delete every page
      ...(session.user.role !== UserRole.ADMIN
        ? { where: { authorId: session.user.id } }
        : {}),
    },
    args
  );

  const response = await prisma.page.delete(finalArgs);

  return response;
};

'use server';

import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import { UserRole, type Prisma, type RecursivePartial } from '@/types';
import deepmerge from 'deepmerge';

// Making the include dynamically is not productive with Typescript
// because it is not possible to make the return type skipable with the optional args
const richInclude = {
  tags: true,
  author: true,
  originalPage: true,
  translatedPages: true,
};

export type PageWithPayload = Prisma.PageGetPayload<{
  include: typeof richInclude;
}>;

export async function getPage({
  where,
}: {
  where: Prisma.PageWhereUniqueInput;
}): Promise<PageWithPayload | null> {
  const response = await prisma.page.findUnique({
    where,
    include: richInclude,
  });

  return response;
}

export const queryPages = async ({
  skip,
  take,
  where,
}: {
  skip?: number;
  take?: number;
  where: Prisma.PageWhereInput;
}): Promise<PageWithPayload[]> => {
  const response = await prisma.page.findMany({
    skip,
    take,
    where,
    include: richInclude,
  });

  return response;
};

export const createPage = async (data: Prisma.PageUncheckedCreateInput) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.page.create({
    data: {
      ...data,
      authorId: session.user.id,
    },
  });

  return response;
};

export const updatePage = async (
  id: string,
  data: Prisma.PageUncheckedUpdateInput
): Promise<PageWithPayload> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.page.update({
    where: {
      id,
      // Only ADMIN can update every page
      ...(session.user.role !== UserRole.ADMIN
        ? { authorId: session.user.id }
        : {}),
    },
    include: richInclude,
    data,
  });

  return response;
};

export const deletePage = async (id: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.page.delete({
    where: {
      id,
      // Only ADMIN can delete every page
      ...(session.user.role !== UserRole.ADMIN
        ? { authorId: session.user.id }
        : {}),
    },
  });

  return response;
};

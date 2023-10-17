'use server';
import 'server-only';

import { prisma } from '@/configs/prisma';
import { getSession } from '@/configs/auth';
import { UserRole, Prisma } from '@/types';

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
}) {
  const response = await prisma.page.findUniqueOrThrow({
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
}) => {
  const response = await prisma.page.findMany({
    skip,
    take,
    where,
    include: richInclude,
  });

  return response;
};

export const createPage = async (
  inputData: Prisma.PageUncheckedCreateInput
) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.page.create({
    data: inputData,
  });

  return response;
};

export const updatePage = async (
  id: string,
  data: Prisma.PageUncheckedUpdateInput
) => {
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

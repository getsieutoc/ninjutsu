'use server';

import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import type { Page } from '@/types';

type CreatePageDto = Pick<Page, 'title' | 'content' | 'slug' | 'locale'>;

export const createPage = async (data: CreatePageDto) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const result = await prisma.page.create({
    data: {
      ...data,
      authorId: session.user.id,
    },
  });

  return result;
};

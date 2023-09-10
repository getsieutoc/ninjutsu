import { prisma } from '@/utils/prisma';
import type { Page } from '@/types';

export const createPage = async (
  data: Pick<Page, 'title' | 'content' | 'slug' | 'locale' | 'authorId'>
) => {
  const res = await prisma.page.create({
    data,
  });

  return res;
};

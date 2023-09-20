'use server';

import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import type { Page } from '@/types';

type CreatePageDto = Pick<
  Page,
  'title' | 'content' | 'slug' | 'locale' | 'originalId'
>;

export const createPage = async (formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const { title, slug, content, locale, ...rest } = Object.fromEntries(
    formData.entries()
  ) as CreatePageDto;

  const result = await prisma.page.create({
    data: {
      title,
      slug,
      content,
      locale,
      meta: {
        // @ts-expect-error
        title: rest['meta.title'],
        // @ts-expect-error
        description: rest['meta.description'],
      },
      authorId: session.user.id,
    },
  });

  return result;
};

type UpdatePageDto = Partial<CreatePageDto>;

export const updatePage = async (id: string, formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const { title, slug, content, locale, ...rest } = Object.fromEntries(
    formData.entries()
  ) as UpdatePageDto;

  const result = await prisma.page.update({
    where: { id, authorId: session.user.id },
    data: {
      title,
      slug,
      content,
      locale,
      meta: {
        // @ts-expect-error
        title: rest['meta.title'],
        // @ts-expect-error
        description: rest['meta.description'],
      },
      authorId: session.user.id,
    },
  });

  console.log('### result: ', { result });
  return result;
};

export const deletePage = async (id: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const result = await prisma.page.delete({
    where: { id, authorId: session.user.id },
  });

  return result;
};

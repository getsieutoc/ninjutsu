'use server';

import { prisma } from '@/configs/prisma';
import { getSession } from '@/configs/auth';
import type { Post } from '@/types';

type CreatePostDto = Pick<Post, 'title' | 'content' | 'slug' | 'locale'>;

export const createPost = async (formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const entries = Object.fromEntries(formData.entries()) as CreatePostDto;

  const result = await prisma.post.create({
    data: {
      ...entries,
      authorId: session.user.id,
    },
  });

  return result;
};

type UpdatePostDto = Partial<CreatePostDto>;

export const updatePost = async (id: string, formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const entries = Object.fromEntries(formData.entries()) as UpdatePostDto;

  const result = await prisma.post.update({
    where: { id, authorId: session.user.id },
    data: entries,
  });

  return result;
};

export const deletePost = async (id: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const result = await prisma.post.delete({
    where: { id, authorId: session.user.id },
  });

  return result;
};

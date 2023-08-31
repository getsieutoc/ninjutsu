import { prisma } from '@/utils/prisma';
import type { Post, Prisma } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ posts: Post[]; count: number } | Post>
) {
  const method = req.method;

  switch (method) {
    case 'GET': {
      const page = Number(req.query.page) ?? 0;
      const limit = Number(req.query.limit) ?? 25;
      const data = await getPosts(page, limit);

      res.status(200).json(data);
      break;
    }
    case 'POST': {
      try {
        const newPost = await prisma.post.create({
          data: req.body,
        });
        res.status(200).json(newPost);
      } catch (error) {
        return NextResponse.json(
          { message: 'POST error', error },
          { status: 500 }
        );
      }
      break;
    }
    default:
      res.status(400);
      break;
  }
}

type OrderByType = {
  [field: string]: Prisma.SortOrder;
};
const getPosts = async (
  skip: number = 0,
  take: number = 25,
  orderBy: OrderByType = { createdAt: 'desc' }
) => {
  const countPost = await prisma.post.count();
  const posts = await prisma.post.findMany({
    skip: skip > 0 ? skip * take : skip,
    take,
    where: {
      deletedAt: null,
    },
    orderBy: {
      ...orderBy,
    },
  });
  return {
    count: countPost,
    posts,
  };
};

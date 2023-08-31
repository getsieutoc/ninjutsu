import { prisma } from '@/utils/prisma';
import type { Post } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post>
) {
  const method = req.method;

  switch (method) {
    case 'GET': {
      const posts = await getPosts();
      res.status(200).json(posts);
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

const getPosts = async () => {
  return await prisma.post.findMany();
};

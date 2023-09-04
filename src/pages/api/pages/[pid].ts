import { prisma } from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const id = pid?.toString() ?? '';
  const method = await req.method;
  const body = await req.body;
  switch (method) {
    case 'GET': {
      try {
        const post = await getPostById(id);
        if (!post) {
          return NextResponse.json(
            {
              messsage: 'Post not found',
            },
            { status: 404 }
          );
        }
        return res.status(200).json(post);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    case 'PATCH': {
      try {
        const updatePost = await prisma.post.update({
          where: {
            id,
          },
          data: body,
        });
        if (!updatePost) {
          return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json({ message: 'Update Error', error });
      }
    }
    case 'DELETE': {
      try {
        await prisma.post.delete({
          where: {
            id,
          },
        });
        return res.status(200).json('Post has been deleted');
      } catch (error) {
        return res.status(500).json({ message: 'GET Error', error });
      }
    }
    default:
      res.status(400);
      break;
  }
}
async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

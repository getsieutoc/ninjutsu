import { prisma } from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const id = pid?.toString() ?? '';
  const method = req.method;

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
        const body = await req.body;
        const { title, content } = body;

        const updatePost = await prisma.post.update({
          where: {
            id,
          },
          data: {
            title,
            content,
          },
        });
        if (!updatePost) {
          return NextResponse.json(
            { message: 'Post not found' },
            { status: 404 }
          );
        }
        return NextResponse.json(updatePost);
      } catch (error) {
        return NextResponse.json(
          { message: 'Update Error', error },
          { status: 500 }
        );
      }
    }
    case 'DELETE': {
      try {
        await prisma.post.delete({
          where: {
            id,
          },
        });
        return NextResponse.json('Post has been deleted');
      } catch (error) {
        return NextResponse.json(
          { message: 'GET Error', error },
          { status: 500 }
        );
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

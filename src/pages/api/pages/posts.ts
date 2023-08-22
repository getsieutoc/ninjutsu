import { prisma } from '@/utils/prisma';
import { Post } from '@prisma/client';
// import { Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post>
) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  }
  if (req.method === 'POST') {
    const { title, published, authorId, content } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        published,
        authorId,
        content,
      },
    });
    res.status(200).json(newPost);
  }
}

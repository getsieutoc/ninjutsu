import { prisma } from '@/utils/prisma';
import type { Post } from '@/types';
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
    // console.log(req.body);
    const newPost = await prisma.post.create({
      data: JSON.parse(req.body),
    });
    res.status(200).json(newPost);
  }
}

import { prisma } from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;

  try {
    const getPost = await prisma.post.findUnique({
      where: {
        id: pid?.toString(),
      },
    });
    return res.status(200).json(getPost);
  } catch (error) {
    return res.status(400).json(error);
  }
}

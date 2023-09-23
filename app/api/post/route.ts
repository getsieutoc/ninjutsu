import { prisma } from '@/configs/prisma';
import type { Post, Prisma } from '@/types';
import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  _res: NextApiResponse<{ posts: Post[]; count: number } | Post>
) {
  const { searchParams } = new URL(req.url);
  const pageIndex = Number(searchParams.get('pageIndex') ?? 0);
  const take = Number(searchParams.get('take') ?? 25);
  try {
    const data = await getPosts(pageIndex, take);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: '404', error });
  }
}
export async function POST(
  req: Request,
  _res: NextApiResponse<{ posts: Post[]; count: number } | Post>
) {
  const data = await req.json();
  try {
    const newPost = await prisma.post.create({ data });
    return NextResponse.json(newPost); //res.status(200).json(newPost);
  } catch (error) {
    return NextResponse.json({ message: 'POST error', error }, { status: 400 });
  }
}

type OrderByType = {
  [field: string]: Prisma.SortOrder;
};
const getPosts = async (
  pageIndex: number = 0,
  take: number = 25,
  orderBy: OrderByType = { createdAt: 'desc' }
) => {
  const count = await prisma.post.count();
  const posts = await prisma.post.findMany({
    skip: pageIndex > 0 ? (pageIndex - 1) * take : pageIndex,
    take,
    orderBy: orderBy,
  });
  return {
    count,
    posts,
  };
};

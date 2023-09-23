import { prisma } from '@/configs/prisma';
import type { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const { pathname } = new URL(req.url);
  const pathUrl = pathname.split('/');
  const pid = pathUrl[pathUrl.length - 1];
  try {
    const post = await getPostById(pid);
    if (!post) {
      return NextResponse.json(
        {
          messsage: 'Post not found',
        },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  const { pathname } = new URL(req.url);
  const pathUrl = pathname.split('/');
  const id = pathUrl[pathUrl.length - 1];
  const data = await req.json();
  try {
    const updatePost = await prisma.post.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatePost);
  } catch (error) {
    return NextResponse.json({ message: 'Update Error', error });
  }
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  const { pathname } = new URL(req.url);
  const pathUrl = pathname.split('/');
  const id = pathUrl[pathUrl.length - 1];
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ mesagge: 'Post has been deleted' }); //res.status(200).json('Post has been deleted');
  } catch (error) {
    return NextResponse.json({ message: 'GET Error', error }); // res.status(500).json({ message: 'GET Error', error });
  }
}
async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

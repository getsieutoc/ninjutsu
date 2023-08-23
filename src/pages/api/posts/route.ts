import { prisma } from '@/utils/prisma';
import { Post } from '@prisma/client';
import { NextResponse } from 'next/server';

export const POST = async (request: Post) => {
  console.log(request);
  return NextResponse.json({ name: 'hello' });
  try {
    const body = await request;
    console.log(body);
    const newPost = await prisma.post.create({
      data: body,
    });
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json(
      { message: 'POST error==>', error },
      { status: 500 }
    );
  }
};

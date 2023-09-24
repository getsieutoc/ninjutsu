import { paramParser, queryParser } from '@/utils/parsers';
import { createUser, queryUsers } from '@/services/users';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/configs/auth';
import { Prisma } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('Unauthorized request');
    }

    const { searchParams } = req.nextUrl;

    const entries = queryParser(searchParams.toString());

    const where =
      'where' in entries ? (entries['where'] as Prisma.UserWhereInput) : {};

    const skip = paramParser(searchParams.get('skip'));
    const take = paramParser(searchParams.get('take'));

    const users = await queryUsers({
      skip,
      take,
      where,
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when query users', error });
  }
}

export async function POST(req: NextRequest) {
  try {
    // We lost the type here, need to find a way to fix it, trpc might help
    const createInput = await req.json();

    const user = await createUser(createInput);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when posting user', error });
  }
}

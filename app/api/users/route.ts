import { exclude, paramParser, queryParser } from '@/utils/parsers';
import { NextRequest, NextResponse } from 'next/server';
import { queryUsers } from '@/services/users';
import { getSession } from '@/configs/auth';
import { Prisma, UserRole } from '@/types';
import { prisma } from '@/configs/prisma';
import { hash } from '@/utils/password';

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

    const totalUser = await prisma.user.count();

    const found = await prisma.user.findFirst({
      where: { email: createInput.email },
    });

    if (found) {
      throw new Error('User already exists');
    }

    const result = await prisma.user.create({
      data: {
        ...createInput,
        password: await hash(createInput.password),
        role: totalUser === 0 ? UserRole.ADMIN : UserRole.USER,
      },
    });

    return NextResponse.json(exclude(result, 'password'));
  } catch (error) {
    return NextResponse.json({ message: 'Problem when posting user', error });
  }
}

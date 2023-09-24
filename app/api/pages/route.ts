import { paramParser, queryParser } from '@/utils/parsers';
import { NextRequest, NextResponse } from 'next/server';
import { createPage, queryPages } from '@/services/pages';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    // We lost the type here, need to find a way to fix it, trpc might help
    const { searchParams } = req.nextUrl;
    const entries = queryParser(searchParams.toString());
    const where =
      'where' in entries ? (entries['where'] as Prisma.PageWhereInput) : {};

    const skip = paramParser(searchParams.get('skip'));
    const take = paramParser(searchParams.get('take'));

    const pages = await queryPages({
      skip,
      take,
      where,
    });

    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when query pages', error });
  }
}

export async function POST(req: NextRequest) {
  try {
    // We lost the type here, need to find a way to fix it, trpc might help
    const createInput = await req.json();

    const page = await createPage(createInput);

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when posting page', error });
  }
}

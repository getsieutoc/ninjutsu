import { paramParser, queryParser } from '@/utils/parsers';
import { NextRequest, NextResponse } from 'next/server';
import { queryPages } from '@/services/pages';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const entries = queryParser(searchParams.toString());

    searchParams.forEach((value, key) => {
      if (key === 'skip' || key === 'take') {
        entries[key] = paramParser(value);
      }
    });

    const pages = await queryPages(entries);

    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when query pages', error });
  }
}

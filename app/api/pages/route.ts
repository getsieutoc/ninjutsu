import { NextRequest, NextResponse } from 'next/server';
import { createPage } from '@/services/pages';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const newPage = await createPage({
    title: 'asdf',
    content: 'asdf',
    slug: 'asdf',
    locale: 'vi',
  });

  return NextResponse.json(newPage);
}

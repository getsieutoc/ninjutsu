import { NextRequest, NextResponse } from 'next/server';
import { updatePage, getPage } from '@/services/pages';
import { i18n } from '@/configs/i18n.config';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string; locale: string } }
) {
  try {
    const { id, locale = i18n.defaultLocale } = params;

    const page = await getPage({ where: { id, locale } });

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when get page', error });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateInput = await req.json();

    const updatedPage = await updatePage(id, updateInput);

    return NextResponse.json(updatedPage);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when update page', error });
  }
}

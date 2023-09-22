import { paramParser, queryParser } from '@/utils/parsers';
import { NextRequest, NextResponse } from 'next/server';
import { updatePage, getPage } from '@/services/pages';

export async function GET(_req: NextRequest, params: { id: string }) {
  try {
    const { id } = params;

    const page = await getPage({ where: { id } });

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when get page', error });
  }
}

// export async function PATCH(req: NextRequest) {
//   try {
//     // We lost the type here, need to find a way to fix it, trpc might help
//     const { searchParams } = new URL(req.url);
//     const entries = queryParser(searchParams.toString());

//     searchParams.forEach((value, key) => {
//       if (key === 'skip' || key === 'take') {
//         entries[key] = paramParser(value);
//       }
//     });

//     const pages = await queryPages(entries);

//     return NextResponse.json(pages);
//   } catch (error) {
//     return NextResponse.json({ message: 'Problem when query pages', error });
//   }
// }

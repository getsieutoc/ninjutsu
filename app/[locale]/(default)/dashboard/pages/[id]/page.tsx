import { redirect } from 'next/navigation';
import { prisma } from '@/utils/prisma';

import { PageForm } from '../components';
import { getSession } from '@/utils/auth';

type EditPageProps = {
  params: { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;
  const session = await getSession();

  if (!session) {
    return redirect('/login');
  }

  const originalPage = await prisma.page.findUnique({
    where: { id },
    include: { tags: true },
  });

  if (!originalPage) {
    return null;
  }

  const translatedPages = await prisma.page.findMany({
    where: { originalId: id },
    include: { tags: true },
  });

  return (
    <PageForm
      backPath="/dashboard/pages"
      title="Edit Page"
      data={originalPage}
      translatedPages={translatedPages}
    />
  );
}

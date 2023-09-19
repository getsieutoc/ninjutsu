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

  const data = await prisma.page.findUnique({ where: { id } });

  if (!originalPage) {
    return null;
  }

  const translatedPages = await prisma.page.findMany({
    where: { originalId: id },
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

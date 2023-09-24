import { redirect } from 'next/navigation';
import { prisma } from '@/configs/prisma';

import { PageForm } from '../components';
import { getSession } from '@/configs/auth';

type EditPageProps = {
  params: { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;
  const session = await getSession();

  if (!session) {
    return redirect('/login');
  }

  const originalPage = await getPage({
    where: { id },
  });

  if (!originalPage) {
    return null;
  }

  return (
    <PageForm
      backPath="/dashboard/pages"
      title="Edit Page"
      data={originalPage}
      translatedPages={originalPage.translatedPages}
    />
  );
}

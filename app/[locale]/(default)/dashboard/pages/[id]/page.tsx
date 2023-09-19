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

  if (!session?.user.id) {
    redirect('/login');
  }
  const data = await prisma.page.findUnique({ where: { id } });

  return <PageForm backPath="/dashboard/pages" title="Edit Page" data={data} />;
}

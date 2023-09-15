import { prisma } from '@/utils/prisma';

import { PageForm } from '../components';

type EditPageProps = {
  params: { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;

  const data = await prisma.page.findUnique({ where: { id } });

  return <PageForm backPath="/dashboard/pages" title="Edit Page" data={data} />;
}

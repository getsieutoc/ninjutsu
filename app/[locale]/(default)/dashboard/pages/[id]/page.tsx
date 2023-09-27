import { getSession } from '@/configs/auth';
import { getPage } from '@/services/pages';
import { redirect } from 'next/navigation';

import { PageForm } from '../components';

type EditPageProps = {
  params: { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;
  const session = await getSession();

  if (!session) {
    return redirect('/login');
  }

  const originalPage = await getPage({ where: { id } });

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

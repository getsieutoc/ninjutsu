import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';

import { PageForm } from '../components';

export default async function AddNewPage() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }

  return <PageForm title="Add New Page" />;
}

import { redirect } from 'next/navigation';
import { PageForm } from '../components';
import { getSession } from '@/utils/auth';

export default async function AddNewPage() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }
  return <PageForm title="Add New Page" />;
}

import { redirect } from 'next/navigation';
import { getSession } from '@/utils/auth';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }

  return 'dashboard overview will be here!!!!!!!!';
}

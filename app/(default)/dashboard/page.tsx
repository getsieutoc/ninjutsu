import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }

  return 'dashboard overview will be here!!!!!!!!';
}

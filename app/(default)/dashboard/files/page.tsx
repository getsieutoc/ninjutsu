import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';

export default async function FilesDashboard() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }
  return 'file managment here';
}

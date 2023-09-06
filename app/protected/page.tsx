import { getServerSession } from 'next-auth/next';
import { GeneralLayout, AccessDenied } from '@/components';
import { authOptions } from '@/lib/auth';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  return (
    <GeneralLayout>
      {session?.user?.id ? <h1>Protected Page</h1> : <AccessDenied />}
    </GeneralLayout>
  );
}

import { getServerSession } from 'next-auth/next';
import { GeneralLayout } from '@/components';
import { authOptions } from '@/lib/auth';
export default async function MePage() {
  const session = await getServerSession(authOptions);

  return (
    <GeneralLayout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </GeneralLayout>
  );
}

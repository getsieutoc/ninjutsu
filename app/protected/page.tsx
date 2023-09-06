import { GeneralLayout, AccessDenied } from '@/components';
import { getSession } from '@/utils/auth';

export default async function ProtectedPage() {
  const session = await getSession();
  return (
    <GeneralLayout>
      {session?.user?.id ? <h1>Protected Page</h1> : <AccessDenied />}
    </GeneralLayout>
  );
}

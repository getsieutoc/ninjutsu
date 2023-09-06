import { getSession } from '@/utils/auth';
import { GeneralLayout } from '@/components';
export default async function MePage() {
  const session = await getSession();

  return (
    <GeneralLayout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </GeneralLayout>
  );
}

import { getSession } from '@/utils/auth';
import { GeneralLayout } from '@/components';

export default async function SettingsPage() {
  const session = await getSession();

  return (
    <GeneralLayout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </GeneralLayout>
  );
}

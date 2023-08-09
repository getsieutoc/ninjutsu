import { useSession } from 'next-auth/react';
import { GeneralLayout } from '@/components';

export default function MePage() {
  const { data } = useSession();

  return (
    <GeneralLayout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </GeneralLayout>
  );
}

import { GeneralLayout } from '@/components';
import { useAuth } from '@/hooks';

export default function MePage() {
  const { session } = useAuth({ required: true });

  return (
    <GeneralLayout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </GeneralLayout>
  );
}

import { redirect } from 'next/navigation';

import { Box } from '@/components/chakra';
import { AccessDenied } from '@/components/client';
import { getSession } from '@/configs/auth';

export default async function ProtectedPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return (
    <Box>
      {session?.user?.id ? <h1>Protected content here</h1> : <AccessDenied />}
    </Box>
  );
}

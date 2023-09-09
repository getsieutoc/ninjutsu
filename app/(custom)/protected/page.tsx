import { Box } from '@/components/chakra';
import { AccessDenied } from '@/components/client';
import { getSession } from '@/utils/auth';

export default async function ProtectedPage() {
  const session = await getSession();
  return (
    <Box>
      {session?.user?.id ? <h1>Protected content here</h1> : <AccessDenied />}
    </Box>
  );
}

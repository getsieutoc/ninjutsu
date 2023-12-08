import { redirect } from 'next/navigation';
import { Box } from '@/components/chakra';
import type { ReactNode } from '@/types';
import { getSession } from '@/configs/auth';

export default async function DefaultLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (session?.user.id) {
    redirect('/');
  }
  return (
    <Box width="100%" height="100vh">
      {children}
    </Box>
  );
}

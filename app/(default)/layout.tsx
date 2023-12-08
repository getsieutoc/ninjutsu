import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';
import { Sidebar } from '@/components/client';
import { ProfileMenu } from '@/components/server';
import { Box, Flex } from '@/components/chakra';
import type { ReactNode } from '@/types';

export default async function DefaultLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <Flex>
      <Sidebar>
        <ProfileMenu />
      </Sidebar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}

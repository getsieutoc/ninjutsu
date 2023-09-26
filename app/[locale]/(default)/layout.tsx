import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';
import { LocaleSwitcher, Sidebar } from '@/components/client';
import { ProfileMenu } from '@/components/server';
import { Box, Flex } from '@/components/chakra';
import type { ReactNode } from '@/types';

export default async function DefaultLayout({
  children,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <Flex>
      <Sidebar>
        <Flex gap={2} align="center">
          <LocaleSwitcher />
          <ProfileMenu />
        </Flex>
      </Sidebar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}

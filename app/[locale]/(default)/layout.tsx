import { redirect } from 'next/navigation';
import { getSession } from '@/utils/auth';
import { LocaleSwitcher, Sidebar } from '@/components/client';
import { ProfileMenu } from '@/components/server';
import { Box, Flex } from '@/components/chakra';
import type { ReactNode, Locale } from '@/types';

export default async function DefaultLayout({
  children,
  params,
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
        <Flex gap={1} align="center">
          <LocaleSwitcher locale={params.locale} />
          <ProfileMenu />
        </Flex>
      </Sidebar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}

import { Box, Flex } from '@/components/chakra';
import { Navbar } from '@/components/server';
import type { ReactNode } from '@/types';

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column">
      <Navbar />

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}

import { Box } from '@/components/chakra';
import type { ReactNode } from '@/types';

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Box width="100%" height="100vh">
      {children}
    </Box>
  );
}

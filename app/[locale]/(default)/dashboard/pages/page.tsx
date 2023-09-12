import { Box, Flex, Heading, Spacer, Text } from '@/components/chakra';
import { VirtualTable } from '@/components/client';
import { prisma } from '@/utils/prisma';

import { AddPageButton } from './AddPageButton';

export default async function PagesDashboard() {
  const pages = await prisma.page.findMany({});

  return (
    <Box>
      <Flex justify="space-between" align="center" width="100%">
        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Pages
        </Heading>

        <AddPageButton />
      </Flex>

      <Spacer />

      {pages.length > 0 ? (
        <VirtualTable
          data={pages}
          columns={[
            {
              header: 'Title',
              accessorKey: 'title',
            },
          ]}
          height={'500px'}
        />
      ) : (
        <Text>No pages</Text>
      )}
    </Box>
  );
}

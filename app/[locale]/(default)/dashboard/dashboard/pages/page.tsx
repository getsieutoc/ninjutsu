import { Box, Flex, Heading, Spacer, Text } from '@/components/chakra';
import { AddNewButton, VirtualTable } from '@/components/client';
import { prisma } from '@/utils/prisma';

export default async function PagesDashboard() {
  const pages = await prisma.page.findMany({});

  return (
    <Box>
      <Flex justify="space-between" align="center" width="100%">
        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Pages
        </Heading>

        <AddNewButton title="Add New Page" />
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

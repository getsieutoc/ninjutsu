import { GoBackButton } from '@/components/client';
import { Flex, Heading, Stack } from '@/components/chakra';

export default function AddNewPage() {
  return (
    <Flex direction="column">
      <Stack direction="row" align="center">
        <GoBackButton />

        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Add New Page
        </Heading>
      </Stack>
    </Flex>
  );
}

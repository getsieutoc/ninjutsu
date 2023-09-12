import { GoBackButton } from '@/components/client';
import { Flex, Heading, Stack } from '@/components/chakra';
import { PageForm } from '../PageForm';

export const dynamic = 'force-dynamic';

export default function AddNewPage() {
  return (
    <Flex direction="column">
      <Stack direction="row" align="center">
        <GoBackButton />

        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Add New Page
        </Heading>
      </Stack>

      <PageForm />
    </Flex>
  );
}

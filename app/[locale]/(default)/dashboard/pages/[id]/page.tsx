import { Flex, Heading, Spinner, Stack } from '@/components/chakra';
import { GoBackButton } from '@/components/client';
import { prisma } from '@/utils/prisma';
import { Suspense } from 'react';

import { PageForm } from '../components';

type EditPageProps = {
  params: { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;

  const data = await prisma.page.findUnique({ where: { id } });
  console.log('### data: ', { data });

  return (
    <Flex direction="column">
      <Stack direction="row" align="center">
        <GoBackButton />

        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Edit Page
        </Heading>
      </Stack>

      <Suspense fallback={<Spinner />}>
        {data && <PageForm data={data} />}
      </Suspense>
    </Flex>
  );
}

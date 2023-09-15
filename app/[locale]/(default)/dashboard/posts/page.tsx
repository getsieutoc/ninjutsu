import { Flex, Heading, Spacer } from '@/components/chakra';
import { AddNewButton } from '@/components/client';
import { prisma } from '@/utils/prisma';
import { PostTable } from './components';

export default async function PostsDashboard() {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  return (
    <Flex direction="column">
      <Flex justify="space-between" align="center" width="100%">
        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Posts
        </Heading>

        <AddNewButton title="Add New Post" />
      </Flex>

      <Spacer />

      <PostTable data={posts} />
    </Flex>
  );
}

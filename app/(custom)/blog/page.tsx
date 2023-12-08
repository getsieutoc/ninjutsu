import { Box, Heading, SimpleGrid, Spinner } from '@/components/chakra';
import { PostCard } from '@/components/client';
import { prisma } from '@/configs/prisma';
import { Metadata } from '@/types';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function BlogsPage() {
  const data = await prisma?.post.findMany({
    take: 25,
    orderBy: { createdAt: 'desc' },
  });

  if (!data) return <Spinner size="sm" />;

  return (
    <>
      <Heading>The latest articles</Heading>
      <Box paddingY={5} />
      <SimpleGrid columns={[2, null, 3]} spacing="10px">
        {data?.map((post, index) => <PostCard key={index} post={post} />)}
      </SimpleGrid>
    </>
  );
}

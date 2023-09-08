import { Box, Heading, SimpleGrid, Spinner } from '@/components/chakra';
import { PostCard } from '@/components/Post';
import { prisma } from '@/utils/prisma';

export default async function BlogsPage() {
  const data = await prisma?.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 25,
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

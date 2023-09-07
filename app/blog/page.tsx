import { prisma } from '@/utils/prisma';
import { Box, GeneralLayout, Heading, SimpleGrid, Spinner } from '@/components';
import { PostCard } from '@/components/Post';

export default async function BlogsPage() {
  const data = await prisma?.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 25,
  });
  if (!data) return <Spinner size="sm" />;
  return (
    <GeneralLayout>
      <Heading>The latest articles</Heading>
      <Box paddingY={5} />
      <SimpleGrid columns={[2, null, 3]} spacing="10px">
        {data?.map((post, index) => <PostCard key={index} post={post} />)}
      </SimpleGrid>
    </GeneralLayout>
  );
}

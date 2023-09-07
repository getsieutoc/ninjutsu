import { Box, GeneralLayout, Heading, Spinner, Wrap } from '@/components';
import { PostCard } from '@/components/Post';

export default async function BlogsPage() {
  const data = await prisma?.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
  if (!data) return <Spinner size="sm" />;
  return (
    <GeneralLayout>
      <Heading>The latest articles</Heading>
      <Box paddingY={5} />
      <Wrap spacing={5}>
        {data?.map((post, index) => <PostCard key={index} post={post} />)}
      </Wrap>
    </GeneralLayout>
  );
}

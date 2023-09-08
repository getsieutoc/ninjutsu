import { Box, Heading } from '@/components/chakra';

type PagePostProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PagePost({ params }: PagePostProps) {
  const { slug } = params;
  const data = await prisma?.post.findUnique({ where: { id: slug } });
  if (!data) return <>Post not found!</>;
  return (
    <Box>
      <Heading>{data?.title}</Heading>
      <Box fontSize={12} color="gray.500">
        {data?.createdAt?.toString()}
      </Box>
      <Box as="div" dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
    </Box>
  );
}

import { Box, Heading } from '@/components/chakra';
import { HTMLParser } from '@/components/client';
import { prisma } from '@/utils/prisma';

type PagePostProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PagePost({ params }: PagePostProps) {
  const { slug } = params;

  const data = await prisma.post.findUnique({ where: { id: slug } });

  if (!data) return <>Post not found!</>;

  return (
    <Box>
      <Heading>{data?.title}</Heading>
      <Box fontSize={12} color="gray.500">
        {data?.createdAt?.toString()}
      </Box>
      <HTMLParser content={data?.content} />
    </Box>
  );
}

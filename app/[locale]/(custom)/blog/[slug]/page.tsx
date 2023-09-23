import { Box, Heading } from '@/components/chakra';
import { HTMLParser } from '@/components/client';
import { htmlSanitizer } from '@/utils/parsers';
import { prisma } from '@/configs/prisma';
import type { Metadata } from '@/types';

type SinglePostViewProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: SinglePostViewProps): Promise<Metadata> {
  const { slug } = params;

  const post = await prisma.post.findUniqueOrThrow({
    where: { id: slug },
    include: { tags: true },
  });

  return {
    title: post.title,
    description: htmlSanitizer(post?.content).slice(0, 200),
    keywords: post.tags.map(({ value }) => value),
  };
}

export default async function SinglePostView({ params }: SinglePostViewProps) {
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

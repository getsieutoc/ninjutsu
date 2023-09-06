'use client';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useSWR } from '@/hooks';
import { GeneralLayout } from '@/components';
import { Post } from '@prisma/client';

const fetcher = async (url: string) => await fetch(url).then((r) => r.json());
const PagePost = () => {
  const pathname = usePathname();
  const pathUrl = pathname.split('/');
  const id = pathUrl[pathUrl.length - 1];
  const { data, error, isLoading } = useSWR<Post>('/api/pages/' + id, fetcher);
  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (error) return <Box>{JSON.stringify(error)}</Box>;
  return (
    <GeneralLayout>
      <Heading>{data?.title}</Heading>
      <Box fontSize={12} color="gray.500">
        {data?.createdAt?.toString()}
      </Box>
      <Box as="div" dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
    </GeneralLayout>
  );
};
export default PagePost;

import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSWR } from '@/hooks';
import { Post } from '@prisma/client';
const fetcher = async (url: string) => await fetch(url).then((r) => r.json());

const PagePost = () => {
  const route = useRouter();
  const { id } = route.query;
  const { data, error, isLoading } = useSWR<Post>('/api/pages/' + id, fetcher);
  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (error) return <Box>{JSON.stringify(error)}</Box>;
  return (
    <Box>
      <Heading>{data?.title}</Heading>
      <Box fontSize={12} color="gray.500">
        {data?.createdAt?.toString()}
      </Box>
      <Box as="div" dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
    </Box>
  );
};
export default PagePost;

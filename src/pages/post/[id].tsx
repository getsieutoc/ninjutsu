import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSWR } from '@/hooks';
const fetcher = async (url: string) => await fetch(url).then((r) => r.json());

const PagePost = () => {
  const route = useRouter();
  const { id } = route.query;

  const { data, error, isLoading } = useSWR('/api/pages/post' + id, fetcher);
  console.log(data);
  return <Box></Box>;
};
export default PagePost;

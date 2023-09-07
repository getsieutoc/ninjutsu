import { Box, GeneralLayout, Heading } from '@/components';

export default function BlogsPage() {
  // const res = await fetch(protocol + '://' + host + '/api/pages/' + id);
  // if (!res.ok) return <>{new Error(res.statusText)}</>;
  // const { data, error, isLoading, mutate } = useSWR<{
  //   count: number;
  //   posts: Post[];
  // }>(`/api/pages?pageIndex=${pageIndex}&take=${take}`);
  return (
    <GeneralLayout>
      <Heading>The latest articles</Heading>
      <Box>if user login then show button create post</Box>
    </GeneralLayout>
  );
}

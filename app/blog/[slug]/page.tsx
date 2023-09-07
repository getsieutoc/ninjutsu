import { type FC } from 'react';
import { headers } from 'next/headers';
import { GeneralLayout, Box, Heading } from '@/components';
import type { Post } from '@/types';

type PropTypes = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const PagePost: FC<PropTypes> = async ({ params }) => {
  const { slug } = params;
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('referer')?.split('://')[0];
  const res = await fetch(protocol + '://' + host + '/api/pages/' + slug);
  if (!res.ok) return <>{new Error(res.statusText)}</>;
  const data: Post = await res.json();
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

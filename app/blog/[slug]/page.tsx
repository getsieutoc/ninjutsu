import { type FC } from 'react';
import { GeneralLayout, Box, Heading } from '@/components';

type PropTypes = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const PagePost: FC<PropTypes> = async ({ params }) => {
  const { slug } = params;
  const data = await prisma?.post.findUnique({ where: { id: slug } });
  if (!data) return <>Post not found!</>;
<<<<<<< HEAD
=======

>>>>>>> 1da05ff (init commit)
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

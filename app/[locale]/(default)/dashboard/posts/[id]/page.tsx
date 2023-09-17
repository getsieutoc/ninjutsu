import { prisma } from '@/utils/prisma';

import { PostForm } from '../components';

type EditPostProps = {
  params: { id: string };
};

export default async function EditPost({ params }: EditPostProps) {
  const { id } = params;

  const data = await prisma.post.findUnique({ where: { id } });

  return <PostForm backPath="/dashboard/posts" title="Edit Post" data={data} />;
}

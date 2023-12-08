import { prisma } from '@/configs/prisma';

import { PostForm } from '../components';

type EditPostProps = {
  params: {
    id: string;
  };
};

export default async function EditPost({ params }: EditPostProps) {
  const { id } = params;

  const post = await prisma.post.findUnique({ where: { id } });

  return <PostForm backPath="/dashboard/posts" title="Edit Post" data={post} />;
}

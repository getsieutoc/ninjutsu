import { prisma } from '@/configs/prisma';

import { PostForm } from '../components';

type EditPostProps = {
  params: {
    id: string;
  };
};

export default async function EditPost({ params }: EditPostProps) {
  const { id } = params;

  const originalPost = await prisma.post.findUnique({ where: { id } });

  if (!originalPost) {
    return null;
  }

  const translatedPosts = await prisma.post.findMany({
    where: { originalId: id },
  });

  return (
    <PostForm
      backPath="/dashboard/posts"
      title="Edit Post"
      data={originalPost}
      translatedPosts={translatedPosts}
    />
  );
}

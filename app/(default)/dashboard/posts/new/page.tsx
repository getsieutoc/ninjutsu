import { PostForm } from '../components';

export default function AddNewPost({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { translateTo, originalId } = searchParams;

  return (
    <PostForm
      title={originalId ? 'Add New Transltation' : 'Add New Post'}
      originalId={originalId}
      translateTo={translateTo}
    />
  );
}

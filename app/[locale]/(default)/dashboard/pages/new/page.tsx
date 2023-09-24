import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';
import { Locale } from '@/types';

import { PageForm } from '../components';

export default async function AddNewPage({
  searchParams,
}: {
  searchParams: {
    translateTo?: Locale;
    originalId?: string;
  };
}) {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }
  const { translateTo, originalId } = searchParams;

  return (
    <PageForm
      title="Add New Page"
      translateTo={translateTo}
      originalId={originalId}
    />
  );
}

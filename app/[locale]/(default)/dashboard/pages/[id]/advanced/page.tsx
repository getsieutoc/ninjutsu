import { getPage } from '@/services/pages';

import { DeleteSection } from '../../components/PageForm/DeleteSection';
import { Skeleton } from '@/components/chakra';

type AdvancedSettingsProps = {
  params: { id: string };
};

export default async function AdvancedSettings({
  params,
}: AdvancedSettingsProps) {
  const data = await getPage({ where: { id: params.id } });

  if (!data) {
    return <Skeleton height="40px" />;
  }

  return <DeleteSection page={data} />;
}

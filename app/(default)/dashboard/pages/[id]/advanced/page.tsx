import { getPage } from '@/services/pages';

import { Box, Flex, Skeleton } from '@/components/chakra';
import { DeleteSection } from '../../components/PageForm/DeleteSection';
import { BasicSEO } from '../../components/BasicSEO';

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

  return (
    <Flex direction="column" gap={4}>
      <Box>
        <BasicSEO data={data} />
      </Box>
      <Box>
        <DeleteSection page={data} />
      </Box>
    </Flex>
  );
}

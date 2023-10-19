import { SkeletonText, Stack } from '@/components/chakra';

export default function CakeViewLoading() {
  return (
    <Stack>
      <SkeletonText mt="4" noOfLines={1} skeletonHeight={500} width="100%" />
    </Stack>
  );
}

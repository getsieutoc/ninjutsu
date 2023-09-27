import { Skeleton, Stack } from '@/components/chakra';

export default function Loading() {
  return (
    <Stack padding={3} spacing={1} maxW={650} justify="center">
      <Skeleton
        startColor="green.500"
        height="40px"
        rounded={5}
        width="150px"
        marginBottom={4}
      />

      <Skeleton height="40px" rounded={5} />
      <Skeleton height="40px" rounded={5} />
      <Skeleton height="40px" rounded={5} />
      <Skeleton height="40px" rounded={5} />
    </Stack>
  );
}

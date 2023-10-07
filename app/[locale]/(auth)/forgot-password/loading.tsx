import { Container, Skeleton, Stack } from '@/components/chakra';

export default function ForgotPasswordLoading() {
  return (
    <Stack spacing={8} maxWidth="md" marginX="auto" paddingTop="10vh">
      <Container shadow="base" rounded={10} paddingX={10} padding={10}>
        <Stack padding={3} spacing={1} maxW={650} justify="center">
          <Skeleton height="40px" rounded={5} width="150px" marginBottom={4} />

          <Skeleton height="40px" rounded={5} />
          <Skeleton height="40px" rounded={5} />
          <Skeleton height="40px" rounded={5} />
          <Skeleton height="40px" rounded={5} />
        </Stack>
      </Container>
    </Stack>
  );
}

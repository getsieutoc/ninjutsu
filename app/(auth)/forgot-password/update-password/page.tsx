import { Stack, Heading, Container } from '@/components/chakra';
import UpdatePasswordForm from './UpdatePasswordForm';

export default async function UpdatePassword() {
  return (
    <Stack spacing={8} maxWidth="md" marginX="auto" paddingTop="10vh">
      <Container shadow="base" rounded={10} paddingX={10} padding={10}>
        <Stack spacing={3} direction="column">
          <Heading as="h1" size="lg" textAlign="center">
            New Password
          </Heading>
          <UpdatePasswordForm />
        </Stack>
      </Container>
    </Stack>
  );
}

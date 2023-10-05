import { redirect } from 'next/navigation';

import { Text, Stack, Heading, Container } from '@/components/chakra';
import { getSession } from '@/configs/auth';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export default async function ForgotPassword() {
  const session = await getSession();

  if (session?.user.id) {
    redirect('/');
  }

  return (
    <Stack spacing={8} maxWidth="md" marginX="auto" paddingTop="10vh">
      <Container shadow="base" rounded={10} paddingX={10} padding={10}>
        <Stack spacing={3} direction="column">
          <Heading as="h1" size="lg" textAlign="center">
            Forgot Password
          </Heading>
          <Text textAlign="center">Enter Your Email Address</Text>
          <ForgotPasswordForm />
        </Stack>
      </Container>
    </Stack>
  );
}

import { redirect } from 'next/navigation';

import { Stack, Heading } from '@/components/chakra';
import LoginForm from './LoginForm';
import { getSession } from '@/configs/auth';

export default async function Login() {
  const session = await getSession();

  if (session?.user.id) {
    redirect('/');
  }
  return (
    <Stack spacing={8} maxWidth="sm" marginX="auto" paddingTop="10vh">
      <Heading as="h1" size="lg">
        Login
      </Heading>

      <LoginForm />
    </Stack>
  );
}

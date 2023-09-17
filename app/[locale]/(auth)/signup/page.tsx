import { Heading, Stack } from '@/components/chakra';
import SignUpForm from './SignUpForm';
import { getSession } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function SignUp() {
  const session = await getSession();

  if (session) {
    redirect('/');
  }

  return (
    <Stack spacing={8} maxWidth="sm" marginX="auto" paddingTop="10vh">
      <Heading as="h1" size="lg">
        Sign Up
      </Heading>
      <SignUpForm />
    </Stack>
  );
}

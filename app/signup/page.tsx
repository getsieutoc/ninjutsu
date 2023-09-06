import { getServerSession } from 'next-auth/next';
import { Heading, Stack } from '@/components';
import SignUpForm from './SignUpForm2';
import { authOptions } from '@/lib/auth';

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" marginTop="10vh">
      <Heading as="h1" size="lg">
        Sign Up
      </Heading>
      <SignUpForm session={session} />
    </Stack>
  );
}

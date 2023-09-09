import { Heading, Stack } from '@/components/chakra';
import SignUpForm from './SignUpForm';
import { getSession } from '@/utils/auth';

export default async function SignUp() {
  const session = await getSession();

  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" paddingTop="10vh">
      <Heading as="h1" size="lg">
        Sign Up
      </Heading>
      <SignUpForm session={session} />
    </Stack>
  );
}

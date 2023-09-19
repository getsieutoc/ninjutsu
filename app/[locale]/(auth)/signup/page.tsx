import { Heading, Stack } from '@/components/chakra';
import SignUpForm from './SignUpForm';

export default async function SignUp() {
  return (
    <Stack spacing={8} maxWidth="sm" marginX="auto" paddingTop="10vh">
      <Heading as="h1" size="lg">
        Sign Up
      </Heading>
      <SignUpForm />
    </Stack>
  );
}

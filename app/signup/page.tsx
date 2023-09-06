import { Heading, Stack } from '@/components';
import SignUpForm from './signUpForm';

export default function SignUp() {
  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" marginTop="10vh">
      <Heading as="h1" size="lg">
        Sign Up
      </Heading>
      <SignUpForm />
    </Stack>
  );
}

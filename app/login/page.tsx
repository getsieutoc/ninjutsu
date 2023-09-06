import { Stack, Heading } from '@/components';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <Stack
      gap={4}
      // alignItems="center"
      maxWidth="sm"
      marginX="auto"
      marginTop="10vh"
    >
      <Heading as="h1" size="lg">
        Login
      </Heading>
      <LoginForm />
    </Stack>
  );
}

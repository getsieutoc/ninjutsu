import { Stack, Heading } from '@/components/chakra';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" paddingTop="10vh">
      <Heading as="h1" size="lg">
        Login
      </Heading>
      <LoginForm />
    </Stack>
  );
}

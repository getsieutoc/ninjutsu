import { Stack, Heading } from '@/components/chakra';
import LoginForm from './LoginForm';

export default async function Login() {
  return (
    <Stack spacing={8} maxWidth="sm" marginX="auto" paddingTop="10vh">
      <Heading as="h1" size="lg">
        Login
      </Heading>

      <LoginForm />
    </Stack>
  );
}

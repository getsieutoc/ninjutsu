'use client';
import {
  Input,
  VStack,
  Divider,
  Button,
  FormLabel,
  FormControl,
} from '@/components/chakra';
import { useAuth, useEffect, useMemo, useState, useRouter } from '@/hooks';
import { getProviders, signIn } from 'next-auth/react';
import { NextLink } from '@/components/client';

export default function LoginForm() {
  const router = useRouter();
  const providers = useMemo(async () => await getProviders(), []);
  const { isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const getCallbackUrl = () => {
    return '/';
  };

  const validEmail = credentials.email.length > 3;
  const hasPassword = credentials.password.length > 8;

  const colorScheme = validEmail && hasPassword ? 'brand' : 'gray';

  useEffect(() => {
    if (isAuthenticated && router) {
      router.back();
    }
  }, [isAuthenticated, router]);
  return (
    <>
      <VStack>
        {Object.values(providers)
          .filter((p) => p.name !== 'Credentials')
          .map((provider) => (
            <Button
              key={provider.name}
              width="100%"
              colorScheme="gray"
              onClick={() =>
                signIn(provider.id, { callbackUrl: getCallbackUrl() })
              }
            >
              Sign in with {provider.name}
            </Button>
          ))}
      </VStack>

      <Divider />

      <FormControl
        isRequired
        isInvalid={credentials.email.length > 0 && !validEmail}
      >
        <FormLabel>Email</FormLabel>
        <Input
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </FormControl>

      <Button
        width="100%"
        size="lg"
        marginTop={2}
        colorScheme={colorScheme}
        // isLoading={!!router.query.callback}
        onClick={() => {
          signIn('credentials', {
            ...credentials,
            redirect: true,
            callbackUrl: getCallbackUrl(),
          });
        }}
      >
        Login
      </Button>

      <Button size="lg" variant="outline" as={NextLink} href="/signup">
        Sign up
      </Button>
    </>
  );
}

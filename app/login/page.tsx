// 'use client';
import { headers } from 'next/headers';
import {
  Input,
  VStack,
  Stack,
  Divider,
  Button,
  Heading,
  NextLink,
  FormLabel,
  FormControl,
} from '@/components';
import { getProviders, signIn } from 'next-auth/react';
import { useMemo, useRouter, useState } from '@/hooks';

export default function Login() {
  const router = useRouter();
  const providers = useMemo(async () => await getProviders(), []);
  const headersList = headers();
  const referer = headersList.get('referer');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const getCallbackUrl = (): string | undefined => {
    const { callbackUrl } = router.query;

    if (typeof callbackUrl === 'string') {
      return callbackUrl;
    }

    return referer ?? undefined;
  };

  const validEmail = credentials.email.length > 3;
  const hasPassword = credentials.password.length > 8;

  const colorScheme = validEmail && hasPassword ? 'brand' : 'gray';

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
        isLoading={!!router.query.callback}
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
    </Stack>
  );
}

'use client';

import {
  Stack,
  Flex,
  Input,
  Button,
  FormLabel,
  FormControl,
} from '@/components/chakra';
import { useState } from '@/hooks';
import { signIn } from 'next-auth/react';
import { NextLink } from '@/components/client';

export default function LoginForm() {
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

  return (
    <Stack spacing={3}>
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
      <NextLink href="/forgot-password">Forgot password?</NextLink>

      <Flex direction="column" gap={2}>
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

        <Button size="lg" variant="ghost" as={NextLink} href="/signup">
          Sign up
        </Button>
      </Flex>
    </Stack>
  );
}

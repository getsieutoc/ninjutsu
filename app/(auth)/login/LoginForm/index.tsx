'use client';

import {
  Stack,
  Flex,
  Input,
  Button,
  FormLabel,
  FormControl,
} from '@/components/chakra';
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from '@/utils/constants';
import { useState, useKeyPressEvent } from '@/hooks';
import { NextLink } from '@/components/client';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [isLoading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const getCallbackUrl = () => {
    return '/';
  };

  const validEmail = EMAIL_REGEX.test(credentials.email);
  const isPasswordLong = credentials.password.length >= MIN_PASSWORD_LENGTH;

  const isValidForm = validEmail && isPasswordLong;

  const handleSubmit = async () => {
    setLoading(true);

    await signIn('credentials', {
      ...credentials,
      redirect: true,
      callbackUrl: getCallbackUrl(),
    });

    setLoading(false);
  };

  useKeyPressEvent('Enter', (e) => {
    if (!isLoading && isValidForm) {
      e.preventDefault();
      handleSubmit();
    }
  });

  const colorScheme = isValidForm ? 'brand' : 'gray';

  return (
    <Stack spacing={3}>
      <FormControl
        isRequired
        isDisabled={isLoading}
        isInvalid={credentials.email.length > 0 && !validEmail}
      >
        <FormLabel>Email</FormLabel>
        <Input
          autoFocus
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </FormControl>

      <FormControl isDisabled={isLoading} isRequired>
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
          isDisabled={isLoading || !isValidForm}
          colorScheme={colorScheme}
          onClick={handleSubmit}
          isLoading={isLoading}
          marginTop={2}
          width="100%"
          size="lg"
        >
          Login
        </Button>

        <Button
          isDisabled={isLoading}
          size="lg"
          variant="ghost"
          as={NextLink}
          href="/signup"
        >
          Sign up
        </Button>
      </Flex>
    </Stack>
  );
}

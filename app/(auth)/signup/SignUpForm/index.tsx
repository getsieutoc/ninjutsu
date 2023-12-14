'use client';

import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Stack,
  Flex,
} from '@/components/chakra';
import { useRouter, useState, useKeyPressEvent, useToast } from '@/hooks';
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from '@/utils/constants';
import { NextLink } from '@/components/client';
import { HttpMethod } from '@/types';

export default function SignUpForm() {
  const router = useRouter();

  const { addToast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState('');

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validEmail = EMAIL_REGEX.test(credentials.email);

  const isPasswordLong = credentials.password.length >= MIN_PASSWORD_LENGTH;

  const isConfirmMatched = credentials.password === confirm;

  const validForm = validEmail && isPasswordLong && isConfirmMatched;

  const colorScheme = validForm ? 'brand' : 'gray';

  const handleSignUp = async () => {
    if (!validForm) return;

    setLoading(true);

    await fetch('/api/users', {
      method: HttpMethod.POST,
      body: JSON.stringify(credentials),
    });

    setLoading(false);

    addToast({
      title: 'Sign up successfully',
      description: 'Please check your mailbox for confirmation email',
    });

    router.push('/login');
  };

  useKeyPressEvent('Enter', (e) => {
    if (!isLoading && validForm) {
      e.preventDefault();
      handleSignUp();
    }
  });

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={credentials.name}
          onChange={(e) =>
            setCredentials({ ...credentials, name: e.target.value })
          }
        />
      </FormControl>

      <FormControl
        isRequired
        isInvalid={credentials.email.length > 0 && !validEmail}
      >
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        {!validEmail && <FormErrorMessage>Email is invalid</FormErrorMessage>}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={credentials.password.length > 0 && !isPasswordLong}
      >
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {credentials.password.length > 0 && !isPasswordLong && (
          <FormErrorMessage>
            Password need at least {MIN_PASSWORD_LENGTH} characters
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={confirm.length > 0 && !isConfirmMatched}
      >
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {confirm.length > 0 && !isConfirmMatched && (
          <FormErrorMessage>Confirmation does not match</FormErrorMessage>
        )}
      </FormControl>

      <Flex direction="column" gap={2}>
        <Button
          width="100%"
          size="lg"
          marginTop={1}
          isLoading={isLoading}
          colorScheme={colorScheme}
          isDisabled={!validForm}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Button size="lg" variant="ghost" as={NextLink} href="/login">
          Login
        </Button>
      </Flex>
    </Stack>
  );
}

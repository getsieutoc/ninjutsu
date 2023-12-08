'use client';

import {
  Button,
  Input,
  Checkbox,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Stack,
  Flex,
} from '@/components/chakra';
import { MIN_PASSWORD_LENGTH } from '@/utils/constants';
import { useRouter, useState } from '@/hooks';
import { NextLink } from '@/components/client';
import { HttpMethod } from '@/types';

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const validEmail = credentials.email.length > 3;
  const isPasswordStrong = credentials.password.length >= MIN_PASSWORD_LENGTH;
  const isConfirmMatched = credentials.password === credentials.confirmPassword;
  const validForm = validEmail && isPasswordStrong && isConfirmMatched;
  const colorScheme = validForm ? 'brand' : 'gray';

  const handleSignUp = async () => {
    setLoading(true);

    await fetch('/api/users', {
      method: HttpMethod.POST,
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    setLoading(false);
    router.push('/login');
  };

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
        isInvalid={credentials.password.length > 0 && !isPasswordStrong}
      >
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {credentials.password.length > 0 && !isPasswordStrong && (
          <FormErrorMessage>
            Password need at least {MIN_PASSWORD_LENGTH} characters
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={credentials.confirmPassword.length > 0 && !isConfirmMatched}
      >
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={credentials.confirmPassword}
          onChange={(e) =>
            setCredentials({ ...credentials, confirmPassword: e.target.value })
          }
        />
        {credentials.confirmPassword.length > 0 && !isConfirmMatched && (
          <FormErrorMessage>Confirmation does not match</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired>
        <Checkbox
          isChecked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        >
          Agree with our Terms of Services
        </Checkbox>
      </FormControl>

      <Flex direction="column" gap={2}>
        <Button
          width="100%"
          size="lg"
          marginTop={1}
          isLoading={isLoading}
          colorScheme={colorScheme}
          isDisabled={!validForm || !agreed}
          onClick={() => handleSignUp()}
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

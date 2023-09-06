'use client';
import {
  Button,
  Checkbox,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  NextLink,
} from '@/components';
import { MIN_PASSWORD_LENGTH } from '@/utils/constants';
import { httpClient } from '@/utils/httpClient';
import { useRouter, useState } from '@/hooks';

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

  const handleSignUp = async () => {
    setLoading(true);

    await httpClient.post('/api/users', credentials);

    setLoading(false);

    await router.push('/login');
  };

  const validEmail = credentials.email.length > 3;
  const isPasswordStrong = credentials.password.length >= MIN_PASSWORD_LENGTH;
  const isConfirmMatched = credentials.password === credentials.confirmPassword;
  const validForm = validEmail && isPasswordStrong && isConfirmMatched;

  const colorScheme = validForm ? 'brand' : 'gray';

  return (
    <>
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

      <Button size="lg" variant="outline" as={NextLink} href="/login">
        Login
      </Button>
    </>
  );
}

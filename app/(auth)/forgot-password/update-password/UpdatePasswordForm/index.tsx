'use client';

import { useSearchParams, useRouter } from '@/hooks';
import { Input, Button, Stack, useToast } from '@/components/chakra';
import { FormWrapper } from '@/components/client';
import { fetcher } from '@/utils/fetcher';
import { HttpMethod } from '@/types';

export default function UpdatePasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const toast = useToast();

  const handleSubmit = async (formData: FormData) => {
    const { newPassword, confirmPassword } = Object.fromEntries(
      formData.entries()
    ) as {
      confirmPassword: string;
      newPassword: string;
    };
    const pass = newPassword.trim();
    const confirmPass = confirmPassword.trim();

    if (!pass || !confirmPass) return alert('Please enter the correct format!');
    if (pass.length < 9)
      return alert('Password must be greater than 8 characters');
    if (pass !== confirmPass)
      return alert('Password and confirm password do not match!');

    const request = await fetcher<{
      data?: { email: string };
      status: number;
      message: string;
    }>(`/api/users/password`, {
      method: HttpMethod.PATCH,
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });

    toast({
      position: 'top',
      status: request.status === 200 ? 'success' : 'error',
      title: request.message,
      duration: 3000,
    });

    if (request?.status === 200) {
      setTimeout(() => router.push(`/login`), 3000);
    }
  };
  return (
    <FormWrapper action={handleSubmit}>
      <Stack direction="column" spacing={5}>
        <Input
          autoFocus
          name="newPassword"
          type="password"
          isRequired
          placeholder="Create new password"
        />
        <Input
          autoFocus
          name="confirmPassword"
          type="password"
          isRequired
          placeholder="Confirm your password"
        />
        <Button width="100%" type="submit" size="lg">
          Change
        </Button>
      </Stack>
    </FormWrapper>
  );
}

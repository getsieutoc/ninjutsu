'use client';

import { Input, Button, Stack } from '@/components/chakra';
import { FormWrapper } from '@/components/client';

export default function UpdatePasswordForm() {
  const handleSubmit = (formData: FormData) => {
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
    console.log('pass :>> ', pass);
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

'use client';

import { Input, Button } from '@/components/chakra';
import { FormWrapper } from '@/components/client';

export default function ForgotPasswordForm() {
  const handleSubmit = (formData: FormData) => {
    const { yourMail } = Object.fromEntries(formData.entries()) as {
      yourMail: string;
    };
    if (!yourMail || !yourMail.trim())
      return alert('Please enter email address!');
    console.log('yourMail :>> ', yourMail);
  };
  return (
    <FormWrapper action={handleSubmit}>
      <Input autoFocus name="yourMail" type="email" isRequired />
      <Button width="100%" marginTop={3} type="submit" size="lg">
        Continue
      </Button>
    </FormWrapper>
  );
}

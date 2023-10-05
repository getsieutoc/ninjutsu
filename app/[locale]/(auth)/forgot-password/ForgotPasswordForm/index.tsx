'use client';

import { useRouter } from '@/hooks';
import { Input, Button } from '@/components/chakra';
import { FormWrapper } from '@/components/client';
import { HttpMethod } from '@/types';
import { fetcher } from '@/utils/fetcher';

export const ForgotPasswordForm = () => {
  // const [isApprove, setIsApprove] = useState(false);
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    const { email } = Object.fromEntries(formData.entries()) as {
      email: string;
    };
    if (!email || !email.trim()) return alert('Please enter email address!');

    const request = await fetcher<{
      data?: { email: string };
      status: number;
      message: string;
    }>(`/api/users/password`, {
      method: HttpMethod.POST,
      body: JSON.stringify({
        email: email,
      }),
    });

    if (request?.data?.email) {
      router.push(
        `/forgot-password/update-password?email=${request.data.email}`
      );
    }
  };

  return (
    <>
      <FormWrapper action={handleAction}>
        <Input autoFocus name="email" type="email" isRequired />
        <Button width="100%" marginTop={3} type="submit" size="lg">
          Continue
        </Button>
      </FormWrapper>
    </>
  );
};

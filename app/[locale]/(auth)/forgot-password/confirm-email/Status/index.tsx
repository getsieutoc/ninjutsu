'use client';

import { redirect } from 'next/navigation';
import { Box, Icon, Stack } from '@/components/chakra';
import { CheckCircleIcon, WarningTwoIcon } from '@/icons';
import { User } from '@/types';
import { useEffect, useRouter } from '@/hooks';

type StatusPropTypes = {
  isOverTime: boolean;
  result: {
    data?: Omit<User, 'password'>;
    status: number;
    description: string;
  };
};
export const Status = ({ result, isOverTime }: StatusPropTypes) => {
  const router = useRouter();
  useEffect(() => {
    if (!result || isOverTime) {
      router.push('/forgot-password/confirm-email');
    }
    setTimeout(() => redirect('/'), 60_000);
  }, [result, isOverTime, router]);

  return (
    <Stack
      color={result?.status === 200 ? 'green.400' : 'red.400'}
      direction="row"
      spacing={1}
    >
      <Icon
        as={result?.status === 200 ? CheckCircleIcon : WarningTwoIcon}
        boxSize={6}
      />
      <Box>{result?.description}</Box>
    </Stack>
  );
};

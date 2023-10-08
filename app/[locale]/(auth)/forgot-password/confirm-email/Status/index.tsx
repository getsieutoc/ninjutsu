'use client';
import { redirect } from 'next/navigation';
import { Box, Icon, Stack } from '@/components/chakra';
import { HOUR_MAX_CONFIRM } from '@/utils/constants';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { User } from '@prisma/client';
import { useEffect, useRouter } from '@/hooks';

type StatusPropTypes = {
  time: number;
  result?: Omit<User, 'password'>;
};
export const Status = ({ time, result }: StatusPropTypes) => {
  const isOverTime = time >= HOUR_MAX_CONFIRM;
  const router = useRouter();
  useEffect(() => {
    if (!result || isOverTime) {
      router.push('/forgot-password/confirm-email');
      setTimeout(() => redirect('/'), 60000);
    }
  }, [result, isOverTime, router]);

  if (isOverTime) {
    return <Box>Time limit expired</Box>;
  }

  return (
    <Stack
      color={result?.id ? 'green.400' : 'red.400'}
      direction="row"
      spacing={1}
    >
      <Icon as={result?.id ? CheckCircleIcon : WarningTwoIcon} boxSize={6} />
      <Box>{result?.id ? `Successfully` : `Failed`}</Box>
    </Stack>
  );
};

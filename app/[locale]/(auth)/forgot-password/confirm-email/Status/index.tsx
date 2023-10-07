'use client';
// import { redirect } from 'next/navigation';
import { Box, Icon, Stack } from '@/components/chakra';
import { HOUR_MAX_CONFIRM } from '@/utils/constants';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

type StatusPropTypes = {
  time: number;
};
export const Status = ({ time }: StatusPropTypes) => {
  //   useEffect(() => {}, []);
  if (time >= HOUR_MAX_CONFIRM) {
    return <Box>Time limit expired</Box>;
  }

  return (
    <Stack color="green.400" direction="row" spacing={1}>
      <Icon as={CheckCircleIcon} boxSize={6} />
      <Box>Successfully</Box>
    </Stack>
  );
};

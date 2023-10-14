import { Stack } from '@/components/chakra';
import { Container } from '@/components/chakra';
import { Locale } from '@/types';
import { differenceInHours } from 'date-fns';
import { Status } from './Status';
import { verifyResetPassword } from '@/services/users';
import { HOUR_MAX_CONFIRM } from '@/utils/constants';

type ConfirmResetPassFromEmailType = {
  params: { locale: Locale };
  searchParams: { c: string };
};
export default async function ConfirmResetPassFromEmail(
  props: ConfirmResetPassFromEmailType
) {
  const { c } = props.searchParams;
  const items = c?.split(':');
  const dateTimeSubmit = Number(items?.[0]);
  const confirmCode = items?.[0] + ':' + items?.[1];
  const newPassword = items?.[2];
  const email = items?.[3];
  const now = Date.now();
  const timeDifference = differenceInHours(now, dateTimeSubmit);
  const isOverTime = timeDifference >= HOUR_MAX_CONFIRM;
  const data = isOverTime
    ? {
        data: undefined,
        status: 404,
        description: 'Time limit expired',
      }
    : await verifyResetPassword(email, newPassword, confirmCode);

  return (
    <Stack spacing={8} maxWidth="md" marginX="auto" paddingTop="10vh">
      <Container shadow="base" rounded={10} paddingX={10} padding={10}>
        <Stack padding={3} spacing={1} maxW={650} justify="center">
          <Status isOverTime={isOverTime} result={data} />
        </Stack>
      </Container>
    </Stack>
  );
}

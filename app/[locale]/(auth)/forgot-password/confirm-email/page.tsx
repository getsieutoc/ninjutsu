import { Stack } from '@/components/chakra';
import { Container } from '@/components/chakra';
import { HttpMethod, Locale } from '@/types';
import { differenceInHours } from 'date-fns';
import { Status } from './Status';
import { fetcher } from '@/utils/fetcher';

type ConfirmResetPassFromEmailType = {
  params: { locale: Locale };
  searchParams: { c: string };
};
export default async function ConfirmResetPassFromEmail(
  props: ConfirmResetPassFromEmailType
) {
  const { c } = props.searchParams;
  const items = c.split(':');
  const dateTimeSubmit = Number(items[0]);
  const confirmCode = items[1];
  const newPassword = items[2];
  const email = items[3];
  const now = Date.now();
  const timeDifference = differenceInHours(now, dateTimeSubmit);

  const data = await fetcher(`/api/users/password`, {
    method: HttpMethod.PUT,
    body: JSON.stringify({
      email,
      password: newPassword,
      confirmCode,
    }),
  });
  console.log('data :>> ', data);

  return (
    <Stack spacing={8} maxWidth="md" marginX="auto" paddingTop="10vh">
      <Container shadow="base" rounded={10} paddingX={10} padding={10}>
        <Stack padding={3} spacing={1} maxW={650} justify="center">
          <Status time={timeDifference} />
        </Stack>
      </Container>
    </Stack>
  );
}

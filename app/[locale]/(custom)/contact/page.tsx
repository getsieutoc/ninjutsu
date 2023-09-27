'use client';

import { useState } from '@/hooks';
import {
  Box,
  Text,
  Button,
  Input,
  Textarea,
  useToast,
  Heading,
  FormLabel,
  Container,
  FormControl,
  FormErrorMessage,
} from '@/components/chakra';
import { type ChangeEvent } from '@/types';
import { fetcher } from '@/utils/fetcher';

const initValues = { name: '', email: '', phone: '', message: '' };
const initState = { isLoading: false, error: '', values: initValues };

type TouchedType = {
  email?: string;
  name?: string;
  phone?: string;
  message?: string;
};
type ValueType = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};
type StateType = {
  isLoading: boolean;
  error?: string;
  values: ValueType;
};
export default function Home() {
  const toast = useToast();
  const [state, setState] = useState<StateType>(initState);
  const [touched, setTouched] = useState<TouchedType>({
    email: '',
    name: '',
    phone: '',
    message: '',
  });

  const { values, isLoading, error } = state;
  const onBlur = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return;
    if (!values.email?.trim()) return alert('Email must be filled in');
    if (!values.name?.trim()) return alert('Name must be filled in');
    if (!values.message?.trim()) return alert('Message must be filled in');
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    await sendContactForm(values, (res) => {
      if (res.status !== 200) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: res.message,
        }));
      } else {
        setTouched({});
        setState(initState);
        toast({
          title: 'Message sent.',
          status: 'success',
          duration: 2000,
          position: 'top',
        });
      }
    });
  };

  return (
    <Container maxW="450px" mt={12} as="form" onSubmit={onSubmit}>
      <Heading mb={3}>Contact</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl
        isRequired
        isInvalid={!!touched.name && !values?.name}
        mb={5}
      >
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!touched.email && !values.email}
        mb={5}
      >
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Phone</FormLabel>
        <Input
          type="text"
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!touched.message && !values.message}
        mb={5}
      >
        <FormLabel>Message</FormLabel>
        <Textarea
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <Box textAlign="center">
        <Button
          type="submit"
          variant="outline"
          colorScheme="blue"
          isLoading={isLoading}
          disabled={!values.name || !values.email || !values.message}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

type ResponseType = {
  message: string;
  status: number;
};
async function sendContactForm(
  data: ValueType,
  callBack?: (response: ResponseType) => void
) {
  const mailOption = {
    from: 'Sieu Toc Web',
    to: data.email,
    subject: 'Welcome to Sieu Toc Web',
    text: 'SieuTocWeb v0.1',
    html: `<H3>Thank you for contacting us. We will contact you soon</H3>`,
    attachments: [
      {
        raw:
          'Content-Type: text/plain\r\n' +
          'Content-Disposition: attachment;\r\n' +
          '\r\n' +
          `Your content:\nName: ${data.name} \nPhone: ${data.phone} \nMessage: ${data.message}`,
      },
    ],
  };

  const res = await fetcher<ResponseType>('/api/mailer', {
    method: 'POST',
    body: JSON.stringify(mailOption),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  callBack && callBack(res);
}

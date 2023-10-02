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

type ValueType = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};
export default function Contact() {
  const toast = useToast();
  const [state, setState] = useState<ValueType>(initValues);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email?.trim()) return alert('Email must be filled in');
    if (!state.name?.trim()) return alert('Name must be filled in');
    if (!state.message?.trim()) return alert('Message must be filled in');
    setIsloading(true);

    const res = await sendContactForm(state);
    if (res.status !== 200) {
      setIsloading(false);
      setError(res.message);
    } else {
      setIsloading(false);
      setState(initValues);
      toast({
        title: 'Message sent.',
        status: 'success',
        duration: 2000,
        position: 'top',
      });
    }
  };

  return (
    <Container maxW="450px" mt={12} as="form" onSubmit={onSubmit}>
      <Heading mb={3}>Contact</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={!state?.name} mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={state.name}
          onChange={handleChange}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!state.email} mb={5}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={state.email}
          onChange={handleChange}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Phone</FormLabel>
        <Input
          type="text"
          name="phone"
          value={state.phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired isInvalid={!state.message} mb={5}>
        <FormLabel>Message</FormLabel>
        <Textarea
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={state.message}
          onChange={handleChange}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <Box textAlign="center">
        <Button
          type="submit"
          variant="outline"
          colorScheme="blue"
          isLoading={isLoading}
          disabled={!state.name || !state.email || !state.message}
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
async function sendContactForm(data: ValueType) {
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

  return await fetcher<ResponseType>('/api/mailer', {
    method: 'POST',
    body: JSON.stringify(mailOption),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

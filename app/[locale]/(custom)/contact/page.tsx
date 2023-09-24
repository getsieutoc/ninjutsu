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

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: 'Message sent.',
        status: 'success',
        duration: 2000,
        position: 'top',
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: JSON.stringify(err),
      }));
    }
  };

  return (
    <Container maxW="450px" mt={12}>
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
          variant="outline"
          colorScheme="blue"
          isLoading={isLoading}
          disabled={!values.name || !values.email || !values.message}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export const sendContactForm = async (data: ValueType) =>
  fetch('/api/mailer/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  });

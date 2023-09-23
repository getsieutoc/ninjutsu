'use client';
import { useState } from '@/hooks';
import {
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
  Box,
} from '@/components/chakra';
import { type ChangeEvent } from '@/types';

const initValues = { name: '', email: '', subject: '', message: '' };
const initState = { isLoading: false, error: '', values: initValues };

type TouchedType = {
  email?: string;
  name?: string;
  subject?: string;
  message?: string;
};
type StateType = {
  isLoading: boolean;
  error?: string;
  values: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
};
export default function Home() {
  const toast = useToast();
  const [state, setState] = useState<StateType>(initState);
  const [touched, setTouched] = useState<TouchedType>({
    email: '',
    name: '',
    subject: '',
    message: '',
  });

  const { values, isLoading, error } = state;

  const onBlur = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    // setState((prev) => ({
    //   ...prev,
    //   isLoading: true,
    // }));
    // try {
    //   await sendContactForm(values);
    //   setTouched({});
    //   setState(initState);
    //   toast({
    //     title: 'Message sent.',
    //     status: 'success',
    //     duration: 2000,
    //     position: 'top',
    //   });
    // } catch (error) {
    //   setState((prev) => ({
    //     ...prev,
    //     isLoading: false,
    //     error: error?.message,
    //   }));
    // }
  };

  return (
    <Container maxW="450px" mt={12}>
      <Heading>Contact</Heading>
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

      <FormControl
        mb={5}
        isRequired
        isInvalid={!!touched.subject && !values.subject}
      >
        <FormLabel>Subject</FormLabel>
        <Input
          type="text"
          name="subject"
          errorBorderColor="red.300"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
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
          //  onChange={handleChange}
          //  onBlur={onBlur}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <Box textAlign="center">
        <Button
          variant="outline"
          colorScheme="blue"
          isLoading={isLoading}
          disabled={
            !values.name || !values.email || !values.subject || !values.message
          }
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

// export const sendContactForm = async (data) =>
//   fetch('/api/contact', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//   }).then((res) => {
//     if (!res.ok) throw new Error('Failed to send message');
//     return res.json();
//   });

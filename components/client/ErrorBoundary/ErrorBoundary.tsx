'use client'; // Error components must be Client Components

import {
  Box,
  Alert,
  Button,
  useToast,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@/components/chakra';
import { useEffect } from '@/hooks';
import { RepeatIcon } from '@/icons';

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const toast = useToast();

  useEffect(() => {
    toast({
      status: 'error',
      title: error.name,
      description: error.message,
    });
  }, [error, toast]);
  return (
    <Box>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {error.name}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <Box as="p">{error.message}</Box>
          <Button
            colorScheme="blue"
            leftIcon={<RepeatIcon />}
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
}

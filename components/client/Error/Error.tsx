'use client'; // Error components must be Client Components

import {
  Box,
  Alert,
  Button,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@/components/chakra';
import { RepeatIcon } from '@/icons';
import { useEffect } from 'react';

export function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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

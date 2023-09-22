'use client'; // Error components must be Client Components

import { Box } from '@/components/chakra';
import { ErrorBoundary } from '@/components/client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box textAlign="center">
      <ErrorBoundary error={error} reset={reset} />
    </Box>
  );
}

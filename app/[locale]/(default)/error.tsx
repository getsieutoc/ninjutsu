'use client'; // Error components must be Client Components

import { Box, useToast } from '@/components/chakra';
import { ErrorBoundary } from '@/components/client';
import { useEffect } from 'react';

export default function Error({
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
    <Box textAlign="center">
      <ErrorBoundary error={error} reset={reset} />
    </Box>
  );
}

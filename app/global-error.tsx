'use client';
import { Button } from '@/components/chakra';
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button onClick={() => reset()} size="sm" colorScheme="blue">
          Try again
        </Button>
      </body>
    </html>
  );
}

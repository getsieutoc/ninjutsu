'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/chakra';

export const ButtonCreatePost = () => {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push('/blog/post-management');
      }}
      size="xs"
      variant="outline"
      colorScheme="blue"
    >
      Create new
    </Button>
  );
};

'use client';

import { Button } from '@/components/chakra';
import { AddIcon } from '@/icons';

export const AddPageButton = () => {
  return (
    <Button colorScheme="green" leftIcon={<AddIcon />} size="sm">
      Add Page
    </Button>
  );
};

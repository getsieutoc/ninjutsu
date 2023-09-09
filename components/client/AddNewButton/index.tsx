'use client';

import { Button } from '@/components/chakra';
import { useRouter, usePathname } from '@/hooks';
import { AddIcon } from '@/icons';

export type AddNewButtonProps = {
  title: string;
};

export const AddNewButton = ({ title = 'Add New' }: AddNewButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const newPath = `${pathname}/new`;
    router.push(newPath);
  };

  return (
    <Button
      colorScheme="green"
      leftIcon={<AddIcon />}
      size="sm"
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

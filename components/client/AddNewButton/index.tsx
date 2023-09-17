'use client';

import { Button } from '@/components/chakra';
import { useRouter, usePathname } from '@/hooks';
import { AddIcon } from '@/icons';

export type AddNewButtonProps = {
  title: string;
  pathname?: string;
};

export const AddNewButton = ({
  title = 'Add New',
  pathname: customPath,
}: AddNewButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const newPath = customPath ?? `${pathname}/new`;
    router.push(newPath);
  };

  return (
    <Button colorScheme="green" leftIcon={<AddIcon />} onClick={handleClick}>
      {title}
    </Button>
  );
};

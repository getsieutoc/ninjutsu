'use client';

import {
  Button,
  IconButton,
  type ButtonProps,
  type IconButtonProps,
} from '@/components/chakra';
import { ArrowBackIcon } from '@/icons';
import { useRouter } from '@/hooks';

export type GoBackButtonProps = ButtonProps | IconButtonProps;

export const GoBackButton = ({ children, ...rest }: GoBackButtonProps) => {
  const router = useRouter();

  if (children) {
    return (
      <Button
        size="sm"
        variant="ghost"
        leftIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        {...rest}
      >
        {children}
      </Button>
    );
  }

  return (
    <IconButton
      size="sm"
      aria-label="Back"
      variant="ghost"
      icon={<ArrowBackIcon />}
      onClick={() => router.back()}
      {...rest}
    />
  );
};

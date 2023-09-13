'use client';

import {
  Button,
  IconButton,
  type ButtonProps,
  type IconButtonProps,
} from '@/components/chakra';
import { ArrowBackIcon } from '@/icons';
import { useRouter } from '@/hooks';

export type GoBackButtonProps = { path?: string } & (
  | ButtonProps
  | IconButtonProps
);

export const GoBackButton = ({
  path,
  children,
  ...rest
}: GoBackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  if (children) {
    return (
      <Button
        size="sm"
        variant="ghost"
        leftIcon={<ArrowBackIcon />}
        onClick={handleClick}
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
      onClick={handleClick}
      {...rest}
    />
  );
};

import {
  useToast as useChakraToast,
  UseToastOptions,
  ToastId,
} from '@chakra-ui/react';
import { useRef } from 'react';

export const useToast = (options?: UseToastOptions) => {
  const toastRef = useRef<ToastId>();

  const toast = useChakraToast(options);

  function updateToast({ id, ...rest }: UseToastOptions) {
    if (id) {
      toast.update(id, rest);
    } else if (toastRef.current) {
      toast.update(toastRef.current, rest);
    }
  }

  function addToast(opts: UseToastOptions) {
    const toastId = toast(opts);
    toastRef.current = toastId;
    return toastId;
  }

  return {
    toast,
    updateToast,
    addToast,
  };
};

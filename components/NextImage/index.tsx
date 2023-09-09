'use client';

import OriginalNextImage, {
  type ImageProps as NextImageProps,
} from 'next/image';
import { chakra } from '@/components/chakra';

export const NextImage = chakra<typeof OriginalNextImage, NextImageProps>(
  OriginalNextImage,
  {
    shouldForwardProp: (prop) =>
      ['height', 'width', 'quality', 'src', 'alt', 'priority'].includes(prop),
  }
);

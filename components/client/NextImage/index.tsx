'use client';

import OriginalNextImage, { type ImageProps } from 'next/image';
import { chakra } from '@/components/chakra';
import { ComponentProps } from 'react';

export const NextImage = chakra<typeof OriginalNextImage, ImageProps>(
  OriginalNextImage,
  {
    shouldForwardProp: (prop) =>
      ['height', 'width', 'quality', 'src', 'alt', 'priority'].includes(prop),
  }
);

export type NextImageProps = ComponentProps<typeof NextImage>;

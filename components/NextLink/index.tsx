'use client';
import OriginalNextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { chakra } from '@chakra-ui/react';

export const NextLink = chakra<typeof OriginalNextLink, NextLinkProps>(
  OriginalNextLink,
  {
    shouldForwardProp: (prop) =>
      [
        'children',
        'href',
        'legacyBehavior',
        'locale',
        'passHref',
        'prefetch',
        'replace',
        'scroll',
        'shallow',
        'target',
      ].includes(prop),
  }
);

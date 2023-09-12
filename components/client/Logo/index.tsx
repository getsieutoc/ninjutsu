'use client';

import { NextLink, NextImage, type NextImageProps } from '@/components/client';
import { Box, HStack, Text } from '@/components/chakra';

export type LogoProps = {
  size?: number;
  href?: string;
} & Partial<NextImageProps>;

export const Logo = ({ size = 12, href = '/', ...rest }: LogoProps) => (
  <NextLink href={href}>
    <HStack width={`${size * 4 * 4}px`} height={`${size * 4}px`}>
      <NextImage
        as="img"
        alt="Logo"
        placeholder="empty"
        src="/next.svg" // this is from /public folder
        width={size}
        {...rest}
      />
      <Box>
        <Text as="span" fontWeight="thin">
          Template
        </Text>
        <Text as="span" fontWeight="bold">
          Demo
        </Text>
      </Box>
    </HStack>
  </NextLink>
);

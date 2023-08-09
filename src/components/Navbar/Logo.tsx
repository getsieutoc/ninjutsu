import { Box, HStack, Text } from '@chakra-ui/react';
import { NextLink } from '../NextLink';
import { NextImage } from '../NextImage';

export type LogoProps = {
  size?: number;
  href?: string;
};

export const Logo = ({ size = 7, href = '/' }: LogoProps) => (
  <NextLink href={href}>
    <HStack width={`${size * 4 * 4}px`} height={`${size * 4}px`}>
      <NextImage
        as="img"
        alt="Logo"
        placeholder="empty"
        borderRadius="full"
        src="/next.svg" // this is from /public folder
        width={size}
      />
      <Box>
        <Text as="span" fontWeight="thin">
          Nextjs
        </Text>
        <Text as="span" fontWeight="bold">
          Template
        </Text>
      </Box>
    </HStack>
  </NextLink>
);

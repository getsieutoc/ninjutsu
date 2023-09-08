'use client';

import { Box, Heading, useColorModeValue } from '@/components/chakra';

export default function Content() {
  const color = useColorModeValue('black', 'gray.600');

  return (
    <Box color={color}>
      <Heading fontWeight={800}>ABOUT US</Heading>
      <Box border="1.5px solid" borderColor={color} width="120px" />
      <Box
        marginY={10}
        lineHeight={8}
        fontSize="lg"
        fontStyle="italic"
        fontFamily="sans-serif"
      >
        {`In today's hyper-connected digital landscape, a super-fast website
             is no longer just a luxury. 
             It is an important necessity. 
             The need for speed goes beyond user convenience and directly impacts your
             website's success, search engine rankings, and ultimately your
             bottom line. We'll dive into the compelling reasons why having a
             lightning-fast website is a must for your online presence.`}
      </Box>
    </Box>
  );
}

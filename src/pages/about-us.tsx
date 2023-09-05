import { Box, Button, GeneralLayout, Heading } from '@/components';

export default function AboutUsPage() {
  return (
    <GeneralLayout>
      <Box
        backgroundImage={`url(/img/bgAboutUs.png)`}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        width="100%"
        height="100%"
      >
        <Box marginTop={50} marginLeft={100}>
          <Heading>ABOUT US</Heading>
          <Box border="1px solid black" w="120px" />

          <Box marginY={10} maxWidth="520px">
            {`In today's hyper-connected digital landscape, a super-fast website
            is no longer just a luxury; it is an important necessity. The need
            for speed goes beyond user convenience and directly impacts your
            website's success, search engine rankings, and ultimately your
            bottom line. We'll dive into the compelling reasons why having a
            lightning-fast website is a must for your online presence.`}
          </Box>
          <Button colorScheme="blue" rounded="50px" size="sm">
            VIEW MORE
          </Button>
        </Box>
      </Box>
    </GeneralLayout>
  );
}

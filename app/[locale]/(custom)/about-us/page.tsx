import { Box, Button } from '@/components/chakra';
import Content from './Content';

export default function AboutUsPage() {
  return (
    <Box
      backgroundImage={`url(/img/bgAboutUs.png)`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      width="100%"
      height="100%"
    >
      <Box marginTop={50} marginLeft={10} maxWidth="450px">
        <Content />
        <Button colorScheme="blue" rounded="50px" size="sm" shadow="dark-lg">
          CONTACT NOW
        </Button>
      </Box>
    </Box>
  );
}

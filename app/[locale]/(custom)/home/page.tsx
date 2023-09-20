import {
  Box,
  Card,
  VStack,
  Avatar,
  HStack,
  CardBody,
  CardFooter,
  Heading,
} from '@/components/chakra';
import { Business, DataExploration, OutlineDesignServices } from '@/icons';
import { Metadata } from '@/types';

export const metadata: Metadata = {
  title: 'Home | Nextjs Template',
  description: 'This is the home page of Nextjs Template',
};

export default function HomePage() {
  return (
    <Box>
      <HStack width="100%" spacing={30}>
        <Card rounded={30} background="#9ccbf7" width="50%">
          <CardBody padding={10}>
            <Avatar src="/img/sangdth.jpg" size="2xl" />
            <Heading marginY={5} size="xl">
              About our work
            </Heading>
            <Box>
              While we were not the first home cleaning company in the UK, we
              take pride in being market leaders in introducing an instant
              online booking system plus the facility for our customers to login
              and control their cleaning service 24/7, 365 days a year putting
              you in complete control.
            </Box>
          </CardBody>
          <CardFooter />
        </Card>
        <VStack width="50%" align="stretch" spacing={20}>
          <HStack spacing={5}>
            <Box padding={5} background="#9ccbf7" rounded="100%" boxSize={20}>
              <OutlineDesignServices boxSize={10} />
            </Box>
            <Box>
              <Heading size="md" mb={5}>
                UI/UX DEVELOPMENT
              </Heading>
              <Box>
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </Box>
            </Box>
          </HStack>
          <HStack spacing={5}>
            <Box padding={5} background="#9ccbf7" rounded="100%" boxSize={20}>
              <DataExploration boxSize={10} />
            </Box>
            <Box>
              <Heading size="md" mb={5}>
                DATABASS PLANNING
              </Heading>
              <Box>
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </Box>
            </Box>
          </HStack>
          <HStack spacing={5}>
            <Box padding={5} background="#9ccbf7" rounded="100%" boxSize={20}>
              <Business boxSize={10} />
            </Box>
            <Box>
              <Heading size="md" mb={5}>
                WORLD BUSINESS
              </Heading>
              <Box>
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </Box>
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

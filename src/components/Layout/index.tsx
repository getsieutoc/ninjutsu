import { Container, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { CustomHead } from '../CustomHead';
import { Navbar } from '../Navbar';

export type GeneralLayoutProps = {
  centerContent?: boolean;
  showNavbar?: boolean;
  children: ReactNode;
};

export const GeneralLayout = ({
  centerContent = false,
  showNavbar = true,
  children,
}: GeneralLayoutProps) => {
  return (
    <>
      <CustomHead title="bookSAO" description="Connect with your dreams" />

      <Container maxW="1280px" centerContent={centerContent}>
        <Flex direction="column" justifyContent="space-between" height="100vh" paddingTop="6">
          {showNavbar && <Navbar />}

          <Flex direction="column" maxWidth="100vw" paddingTop={8} height="100%" as="main">
            {children}
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

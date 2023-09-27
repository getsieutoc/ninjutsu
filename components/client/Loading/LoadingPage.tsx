import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Text,
} from '@/components/chakra';
import { useColorModeValue, useDisclosure } from '@/hooks';

export type LoadingScreenProps = {
  color?: string;
};

export const LoadingPage = ({ color }: LoadingScreenProps) => {
  const { onClose } = useDisclosure();

  const textColor = useColorModeValue('gray.100', 'gray.300');

  return (
    <Modal
      isOpen
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={onClose}
      size="md"
    >
      <ModalOverlay background="blackAlpha.500" backdropFilter="blur(5px)" />
      <ModalContent background="transparent" shadow="none">
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          background="transparent"
        >
          <Flex
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            background="transparent"
          >
            <Spinner
              size="lg"
              thickness="4px"
              color={color ?? textColor}
              label="Loading..."
            />

            <Text marginTop="10px" color={color ?? textColor}>
              Loading...
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

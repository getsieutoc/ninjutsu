'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
} from '@/components/chakra';
import {
  useColorModeValue,
  useDisclosure,
  useRef,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { deletePage } from '@/services/pages';
import type { Page } from '@/types';

export type PageDeleteSectionProps = {
  isDisabled?: boolean;
  page: Page;
};

export const DeleteSection = ({ isDisabled, page }: PageDeleteSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const cancelRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmText, setConfirmText] = useState('');

  const pageId = page?.id ?? '';

  const handleCancel = () => {
    setConfirmText('');
    onClose();
  };

  const handleDelete = async () => {
    try {
      if (!page || isDisabled) return;

      setIsLoading(true);

      await deletePage(pageId);

      toast({ description: 'Delete successfully' });

      setIsLoading(false);

      onClose();

      router.refresh();
      router.push('/dashboard/pages');
    } catch (error: any) {
      toast({ status: 'error', title: `Error: ${error.message}` });
    }
  };

  const backgroundColor = useColorModeValue('red.50', 'red.900');
  const footerBorder = useColorModeValue('red.100', 'red.600');

  if (!pageId) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card bg={backgroundColor} direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Delete Page</Heading>
        </CardHeader>

        <CardBody>
          <Stack spacing={6} maxW="480px" minW="240px">
            <Text>
              The page will be permanently deleted. This action is irreversible
              and can not be undone.
            </Text>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="end">
            <Button
              colorScheme="red"
              isDisabled={isLoading || isDisabled}
              isLoading={isLoading}
              onClick={onOpen}
            >
              Delete
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Are you sure?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel>
                Confirm by typing:{' '}
                <Text as="span" fontWeight="bold">
                  YES
                </Text>
              </FormLabel>
              <Input
                placeholder="YES"
                value={confirmText ?? ''}
                onChange={(event) => setConfirmText(event.target.value)}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack direction="row" spacing={3}>
              <Button
                ref={cancelRef}
                isDisabled={isLoading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                isDisabled={confirmText !== 'YES' || isLoading}
                colorScheme="red"
                onClick={handleDelete}
              >
                Yes, delete it
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

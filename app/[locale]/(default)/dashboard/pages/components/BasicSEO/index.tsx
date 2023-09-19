import {
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
  Stack,
} from '@/components/chakra';
import { useColorModeValue, useState } from '@/hooks';
import { JsonObject, Prisma } from '@/types';
import { htmlSanitizer } from '@/utils/parsers';

export type PageWithPayload = Prisma.PageGetPayload<{
  include: { tags: true };
}>;

export type BasicSEOProps = {
  data: PageWithPayload;
};

export const BasicSEO = ({ data }: BasicSEOProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const metaData = data.meta as JsonObject;

  const initialData = {
    title: (metaData?.title as string) ?? data.title,
    description:
      (metaData?.description as string) ??
      htmlSanitizer(data.content).slice(0, 200),
    keywords:
      (metaData?.keywords as string[]) ?? data.tags.map(({ value }) => value),
  };

  const [inputData, setInputData] = useState(initialData);

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">Basic SEO Settings</Heading>
      </CardHeader>

      <CardBody>
        <Stack spacing={6} maxW="480px" minW="240px">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={initialData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              value={initialData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
          </FormControl>
        </Stack>
      </CardBody>

      <Divider color={footerBorder} />

      <CardFooter>
        <Flex width="100%" direction="row" justify="end">
          <Button
            colorScheme="blue"
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

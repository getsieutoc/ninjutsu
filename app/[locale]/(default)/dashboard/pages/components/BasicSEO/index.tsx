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
import { JsonObject, PageWithPayload } from '@/types';
import { htmlSanitizer } from '@/utils/parsers';

export type BasicSEOProps = {
  data: Partial<PageWithPayload> | undefined;
};

export const BasicSEO = ({ data: propsData }: BasicSEOProps) => {
  const metaData = propsData?.meta as JsonObject;

  const initialData = {
    title: (metaData?.title as string) ?? propsData?.title,
    description:
      (metaData?.description as string) ??
      htmlSanitizer(propsData?.content).slice(0, 200),
    keywords:
      (metaData?.keywords as string[]) ??
      propsData?.tags?.map(({ value }) => value) ??
      [],
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
              name="meta.title"
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              name="meta.description"
              value={inputData.description}
              onChange={(e) =>
                setInputData({ ...inputData, description: e.target.value })
              }
            />
          </FormControl>
        </Stack>
      </CardBody>

      <Divider color={footerBorder} />

      <CardFooter>
        <Flex width="100%" direction="row" justify="end">
          <Button type="submit" colorScheme="blue">
            Save
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

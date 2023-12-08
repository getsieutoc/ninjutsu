'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from '@/components/chakra';
import {
  useColorModeValue,
  useEffect,
  useMemo,
  useSWR,
  useState,
} from '@/hooks';
import { HttpMethod, JsonObject, PageWithPayload } from '@/types';
import { isEqual } from '@/utils/compare';
import { fetcher } from '@/utils/fetcher';

type MetaData = {
  title: string;
  description: string;
  keywords: string[];
};
const initialValues: MetaData = {
  title: '',
  description: '',
  keywords: [],
};
export type BasicSEOProps = {
  data: Partial<PageWithPayload> | undefined;
};

export const BasicSEO = ({ data: propsData }: BasicSEOProps) => {
  const { data, mutate } = useSWR(
    propsData ? `/api/pages/${propsData.id}` : null
  );

  const metaData = data?.meta as JsonObject;

  const initialData = useMemo(
    () => ({
      title: (metaData?.title as string) ?? '',
      description: (metaData?.description as string) ?? '',
      keywords: (metaData?.keywords as string[]) ?? [],
    }),
    [metaData]
  );

  const [inputData, setInputData] = useState(initialValues);

  useEffect(() => {
    if (data && isEqual(inputData, initialValues)) {
      setInputData(initialData);
    }
  }, [data, initialData, inputData]);

  const [isLoading, setIsLoading] = useState(false);

  const isDirty = !isEqual(inputData, initialData);

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const handleSave = async () => {
    if (!propsData) return;

    setIsLoading(true);
    await fetcher(`/api/pages/${propsData.id}`, {
      method: HttpMethod.PATCH,
      body: JSON.stringify({
        meta: inputData,
      }),
    });

    mutate();
    setIsLoading(false);
  };

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">Basic SEO Settings</Heading>
      </CardHeader>

      <CardBody>
        <Stack spacing={6} maxW="480px" minW="240px">
          <FormControl isRequired isDisabled={isLoading}>
            <FormLabel>Title</FormLabel>
            <Input
              name="meta.title"
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl isRequired isDisabled={isLoading}>
            <FormLabel>Description</FormLabel>
            <Textarea
              rows={3}
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

      <CardFooter justify="end">
        <Stack direction="row" spacing={2}>
          {isDirty && (
            <Button onClick={() => setInputData(initialData)}>Reset</Button>
          )}
          <Button
            isDisabled={!isDirty || isLoading}
            isLoading={isLoading}
            colorScheme={isDirty ? 'blue' : 'gray'}
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};

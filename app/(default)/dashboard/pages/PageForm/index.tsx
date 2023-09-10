'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  Textarea,
} from '@/components/chakra';
import { CustomEditable } from '@/components/client';
import { useEffect, useState } from '@/hooks';
import { RepeatIcon } from '@/icons';
import { Page } from '@/types';
import slugify from 'slugify';

export type PageFormProps = {
  data?: Partial<Page>;
};

export const PageForm = ({ data }: PageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState({
    title: data?.title ?? '',
    content: data?.content ?? '',
    slug: data?.slug ?? '',
  });

  const [isCustomEdited, setIsCustomEdited] = useState(false);

  useEffect(() => {
    if (!isCustomEdited) {
      setInputData((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [inputData.title, isCustomEdited]);

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await fetch('/api/pages', {
      method: 'POST',
      body: JSON.stringify(inputData),
    });

    const data = await res.json();

    setIsLoading(false);

    if (res.status === 200) {
      // router.push('/dashboard/pages');
    }
  };

  return (
    <Flex gap={6}>
      <Stack spacing={3} flex={1}>
        <FormControl isDisabled={isLoading}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Page title"
            value={inputData?.title}
            onChange={(event) =>
              setInputData({ ...inputData, title: event.target.value })
            }
          />

          {inputData.slug && (
            <Flex marginTop={2} align="center" gap={2} color="gray">
              <Heading as="h4" fontSize="sm">
                Slug:
              </Heading>

              <CustomEditable
                value={inputData.slug}
                onChange={(newValue) => {
                  setIsCustomEdited(true);
                  setInputData({ ...inputData, slug: newValue });
                }}
              />

              {isCustomEdited && (
                <IconButton
                  aria-label="Reset"
                  size="xs"
                  icon={<RepeatIcon />}
                  onClick={() => {
                    setIsCustomEdited(false);
                    setInputData({
                      ...inputData,
                      slug: slugify(inputData.title),
                    });
                  }}
                />
              )}
            </Flex>
          )}
        </FormControl>

        <FormControl isDisabled={isLoading}>
          <FormLabel>Title</FormLabel>
          <Textarea
            placeholder="Page title"
            value={inputData?.content}
            onChange={(event) =>
              setInputData({ ...inputData, content: event.target.value })
            }
          />
        </FormControl>
      </Stack>

      <Stack spacing={3} width="280px">
        <Button colorScheme="blue" isLoading={isLoading} onClick={handleSubmit}>
          Publish
        </Button>
      </Stack>
    </Flex>
  );
};

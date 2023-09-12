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
import { createPage } from '@/services/pages';
import { Page } from '@/types';
import slugify from 'slugify';

export type PageFormProps = {
  data?: Partial<Page>;
};

export const PageForm = ({ data: propsData }: PageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setInputData] = useState({
    title: propsData?.title ?? '',
    content: propsData?.content ?? '',
    slug: propsData?.slug ?? '',
  });

  const [isCustomEdited, setIsCustomEdited] = useState(false);

  useEffect(() => {
    if (!isCustomEdited) {
      setInputData((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [data.title, isCustomEdited]);

  const handleSubmit = async () => {
    const res = await createPage({ ...data, locale: 'vi' });
    console.log('### res: ', { res });
  };

  return (
    <Flex gap={6}>
      <Stack spacing={3} flex={1}>
        <FormControl isDisabled={isLoading}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Page title"
            value={data?.title}
            onChange={(event) =>
              setInputData({ ...data, title: event.target.value })
            }
          />

          {data.slug && (
            <Flex marginTop={2} align="center" gap={2} color="gray">
              <Heading as="h4" fontSize="sm">
                Slug:
              </Heading>

              <CustomEditable
                value={data.slug}
                onChange={(newValue) => {
                  setIsCustomEdited(true);
                  setInputData({ ...data, slug: newValue });
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
                      ...data,
                      slug: slugify(data.title),
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
            value={data?.content}
            onChange={(event) =>
              setInputData({ ...data, content: event.target.value })
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

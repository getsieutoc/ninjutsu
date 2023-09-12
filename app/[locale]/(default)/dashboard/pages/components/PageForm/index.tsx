'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
} from '@/components/chakra';
import { CustomEditable, FormWrapper, TextEditor } from '@/components/client';
import { useEffect, useRouter, useState, useToast } from '@/hooks';
import { RepeatIcon } from '@/icons';
import { createPage, updatePage } from '@/services/pages';
import { Page } from '@/types';
import slugify from 'slugify';

export type PageFormProps = {
  data?: Page;
};

export const PageForm = ({ data: propsData }: PageFormProps) => {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setInputData] = useState({
    title: propsData?.title ?? '',
    content: propsData?.content ?? '',
    slug: propsData?.slug ?? '',
    locale: propsData?.locale ?? 'vi',
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

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (propsData) {
      const response = await updatePage(propsData.id, formData);

      if (response) {
        toast({ description: 'Cập nhật thành công' });
        router.refresh();
      }
    } else {
      const response = await createPage(formData);

      if (response) {
        toast({ description: 'Published successfully' });
        router.refresh();
        router.push(`/dashboard/pages/${response.id}`);
      }
    }

    setIsLoading(false);
  };

  return (
    <FormWrapper action={handleSubmit}>
      <Flex gap={6}>
        <Stack spacing={3} flex={1}>
          <FormControl isDisabled={isLoading}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Page title"
              name="title"
              value={data?.title}
              onChange={(event) =>
                setInputData({ ...data, title: event.target.value })
              }
            />

            <Flex marginTop={2} align="center" gap={2} color="gray" minH="29px">
              <Heading as="h4" fontSize="sm">
                Slug:
              </Heading>

              {data.slug && (
                <CustomEditable
                  name="slug"
                  value={data.slug}
                  onChange={(newValue) => {
                    setIsCustomEdited(true);
                    setInputData({ ...data, slug: newValue });
                  }}
                />
              )}

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
          </FormControl>

          <FormControl id="text-editor" isDisabled={isLoading}>
            <FormLabel>Content</FormLabel>
            <TextEditor
              id="text-editor"
              name="content"
              value={data.content}
              onChange={(newValue) =>
                setInputData({ ...data, content: newValue })
              }
            />
          </FormControl>

          <FormControl isDisabled={isLoading}>
            <FormLabel>Locale</FormLabel>
            <Select
              name="locale"
              placeholder="Select locale"
              value={data.locale}
              onChange={(e) =>
                setInputData({ ...data, locale: e.currentTarget.value })
              }
            >
              <option value="vi">Vietnamese</option>
              <option value="en">English</option>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={3} width="280px">
          <Button colorScheme="blue" isLoading={isLoading} type="submit">
            {propsData ? 'Update' : 'Publish'}
          </Button>
        </Stack>
      </Flex>
    </FormWrapper>
  );
};

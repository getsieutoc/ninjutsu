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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@/components/chakra';
import {
  CustomEditable,
  FormWrapper,
  GoBackButton,
  TextEditor,
} from '@/components/client';
import { useEffect, useRouter, useState, useToast } from '@/hooks';
import { createPost, updatePost } from '@/services/posts';
import { ArrowUpIcon, RepeatIcon } from '@/icons';
import { isEqual } from '@/utils/compare';
import { Post } from '@/types';
import slugify from 'slugify';

import { DeleteSection } from './DeleteSection';

export type PostFormProps = {
  title?: string;
  backPath?: string;
  data?: Post;
};

export const PostForm = ({
  backPath,
  title,
  data: propsData,
}: PostFormProps) => {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const initialData = {
    id: propsData?.id ?? '',
    title: propsData?.title ?? '',
    slug: propsData?.slug ?? '',
    content: propsData?.content ?? '',
    locale: propsData?.locale ?? 'en',
  };
  const [data, setInputData] = useState(initialData);

  const [isCustomEdited, setIsCustomEdited] = useState(false);

  useEffect(() => {
    if (!isCustomEdited) {
      setInputData((prev) => ({
        ...prev,
        slug: slugify(prev?.title),
      }));
    }
  }, [data.title, isCustomEdited]);

  const isFormDirty = isEqual(data, initialData);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (propsData && isFormDirty) {
      const response = await updatePost(propsData.id, formData);

      if (response) {
        toast({ description: 'Cập nhật thành công' });
        router.refresh();
      }
    } else {
      const response = await createPost(formData);

      if (response) {
        toast({ description: 'Published successfully' });
        router.refresh();
        router.push(`/dashboard/posts/${response.id}`);
      }
    }

    setIsLoading(false);
  };

  return (
    <FormWrapper action={handleSubmit}>
      <Flex align="center" justify="space-between">
        <Stack direction="row" align="center">
          <GoBackButton path={backPath} />

          <Heading as="h3" size="lg" color="gray">
            {title}
          </Heading>
        </Stack>

        <Button
          type="submit"
          isDisabled={isFormDirty}
          colorScheme={propsData ? 'blue' : 'green'}
          isLoading={isLoading}
          leftIcon={propsData ? <RepeatIcon /> : <ArrowUpIcon />}
        >
          {propsData ? 'Update Post' : 'Publish Post'}
        </Button>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab isDisabled={!propsData}>Advance</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={4} flex={1}>
              <FormControl isDisabled={isLoading}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Post title"
                  name="title"
                  value={data?.title}
                  onChange={(event) =>
                    setInputData({ ...data, title: event.target.value })
                  }
                />

                <Flex marginTop={2} align="center" gap={2} minH="29px">
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
          </TabPanel>
          <TabPanel>{propsData && <DeleteSection post={propsData} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </FormWrapper>
  );
};

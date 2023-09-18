import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import {
  AddIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  GlobeIcon,
  LockIcon,
  RepeatIcon,
} from '@/icons';
import { useEffect, useLocale, useRouter, useState, useToast } from '@/hooks';
import { createPost, updatePost } from '@/services/posts';
import { i18n } from '@/configs/i18n.config';
import { isEqual } from '@/utils/compare';
import { Post } from '@/types';
import slugify from 'slugify';

import { DeleteSection } from './DeleteSection';

export type PostFormProps = {
  title?: string;
  backPath?: string;
  data?: Post;
  translatedPosts?: Post[];
  originalId?: string;
  translateTo?: string;
};

export const PostForm = ({
  backPath,
  title,
  data: propsData,
  translatedPosts,
  originalId,
  translateTo,
}: PostFormProps) => {
  const toast = useToast();
  const router = useRouter();

  const { currentLocale, defaultLocale } = useLocale();

  const [isLoading, setIsLoading] = useState(false);

  const initialData = {
    title: propsData?.title ?? '',
    slug: propsData?.slug ?? '',
    content: propsData?.content ?? '',
    locale: propsData?.locale ?? translateTo ?? currentLocale,
    originalId: propsData?.originalId ?? originalId,
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

  const getTranslationIcon = (locale: string) => {
    const foundTranslated = translatedPosts?.find((p) => p.locale === locale);

    if (defaultLocale === locale) {
      return <LockIcon />;
    }

    if (
      (foundTranslated && foundTranslated.locale === locale) ||
      data.locale === locale
    ) {
      return <CheckCircleIcon />;
    }

    return <AddIcon />;
  };

  const handleNewTranslatedPost = (locale: string) => {
    if (!propsData) return;

    const foundTranslated = translatedPosts?.find((p) => p.locale === locale);

    if (foundTranslated) {
      // Go to edit translated post version
      const newPath = `/dashboard/posts/${foundTranslated.id}`;
      router.push(newPath);
    } else if (data.originalId) {
      // Go to edit original post version
      const newPath = `/dashboard/posts/${data.originalId}`;
      router.push(newPath);
    } else {
      // Or else go to create new post
      const newPath = `/dashboard/posts/new?translateTo=${locale}&originalId=${propsData.id}`;
      router.push(newPath);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (propsData) {
      const response = await updatePost(propsData.id, formData);

      if (response) {
        toast({ description: 'Cập nhật thành công' });
        router.refresh();
      }
    } else {
      if (originalId && translateTo) {
        formData.append('originalId', originalId);
        formData.append('locale', translateTo);
      } else {
        formData.append('locale', currentLocale);
      }

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

        <Stack direction="row" align="center">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              isDisabled={!propsData}
            >
              <GlobeIcon /> Translations
            </MenuButton>
            <MenuList>
              {i18n.locales.map(({ label, value }) => {
                return (
                  <MenuItem
                    key={value}
                    isDisabled={data.locale === value}
                    icon={getTranslationIcon(value)}
                    onClick={() => handleNewTranslatedPost(value)}
                  >
                    {label} {defaultLocale === value ? '(default)' : ''}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>

          <Button
            type="submit"
            isDisabled={isFormDirty}
            colorScheme={propsData ? 'blue' : 'green'}
            isLoading={isLoading}
            leftIcon={propsData ? <RepeatIcon /> : <ArrowUpIcon />}
          >
            {propsData ? 'Update Post' : 'Publish Post'}
          </Button>
        </Stack>
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
            </Stack>
          </TabPanel>
          <TabPanel>{propsData && <DeleteSection post={propsData} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </FormWrapper>
  );
};

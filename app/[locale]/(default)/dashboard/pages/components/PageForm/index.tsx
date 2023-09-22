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
  useAuth,
  useEffect,
  useLocale,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import {
  AddIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  GlobeIcon,
  LockIcon,
  RepeatIcon,
} from '@/icons';
import { createPage, updatePage } from '@/services/pages';
import { PageWithTags } from '@/types';
import slugify from 'slugify';
import { i18n } from '@/configs/i18n.config';

import { DeleteSection } from './DeleteSection';
import { isEqual } from '@/utils/compare';

export type PageFormProps = {
  title?: string;
  backPath?: string;
  data?: PageWithTags;
  translatedPages?: PageWithTags[];
  originalId?: string;
  translateTo?: string;
};

export const PageForm = ({
  backPath,
  title,
  data: propsData,
  translatedPages,
  originalId,
  translateTo,
}: PageFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const { session } = useAuth();

  const { currentLocale, defaultLocale } = useLocale();

  const [isLoading, setIsLoading] = useState(false);

  const initialData = {
    id: propsData?.id ?? '',
    title: propsData?.title ?? '',
    slug: propsData?.slug ?? '',
    content: propsData?.content ?? '',
    locale: propsData?.locale ?? translateTo ?? currentLocale,
    originalId: propsData?.originalId ?? originalId,
    meta: propsData?.meta ?? {},
    tags: propsData?.tags ?? [],
  };

  const [inputData, setInputData] = useState(initialData);

  const [isCustomEdited, setIsCustomEdited] = useState(false);

  useEffect(() => {
    if (!isCustomEdited) {
      setInputData((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [inputData.title, isCustomEdited]);

  const isFormDirty = isEqual(inputData, initialData);

  const getTranslationIcon = (locale: string) => {
    const foundTranslated = translatedPages?.find((p) => p.locale === locale);

    if (defaultLocale === locale) {
      return <LockIcon />;
    }

    if (
      (foundTranslated && foundTranslated.locale === locale) ||
      inputData.locale === locale
    ) {
      return <CheckCircleIcon />;
    }

    return <AddIcon />;
  };

  const handleNewTranslatedPage = (locale: string) => {
    if (!propsData) return;

    const foundTranslated = translatedPages?.find((p) => p.locale === locale);

    if (foundTranslated) {
      // Go to edit translated page version
      const newPath = `/dashboard/pages/${foundTranslated.id}`;
      router.push(newPath);
    } else if (inputData.originalId) {
      // Go to edit original page version
      const newPath = `/dashboard/pages/${inputData.originalId}`;
      router.push(newPath);
    } else {
      // Or else go to create new page
      const newPath = `/dashboard/pages/new?translateTo=${locale}&originalId=${propsData.id}`;
      router.push(newPath);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (propsData) {
      const { title, slug, content } = Object.fromEntries(
        formData.entries()
      ) as { title: string; slug: string; content: string };

      const response = await updatePage({
        where: { id: propsData.id },
        data: {
          title,
          slug,
          content,
        },
      });

      if (response) {
        console.log('### response: ', { response });
        toast({ description: 'Update successfully' });
        router.refresh();
      }
    } else {
      if (!session) return;

      const { title, slug, content } = Object.fromEntries(
        formData.entries()
      ) as { title: string; slug: string; content: string };

      const response = await createPage({
        data: {
          title,
          slug,
          content,
          originalId,
          locale: translateTo ?? defaultLocale,
          authorId: session.user.id,
        },
      });

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
                    isDisabled={inputData.locale === value}
                    icon={getTranslationIcon(value)}
                    onClick={() => handleNewTranslatedPage(value)}
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
            {propsData ? 'Update Page' : 'Publish Page'}
          </Button>
        </Stack>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Advance</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={4} flex={1}>
              <Input type="hidden" name="locale" value={inputData.locale} />

              <FormControl isDisabled={isLoading}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Page title"
                  name="title"
                  value={inputData.title}
                  onChange={(event) =>
                    setInputData({ ...inputData, title: event.target.value })
                  }
                />

                <Flex
                  marginTop={2}
                  align="center"
                  gap={2}
                  color="gray"
                  minH="29px"
                >
                  <Heading as="h4" fontSize="sm">
                    Slug:
                  </Heading>

                  {inputData.slug && (
                    <CustomEditable
                      name="slug"
                      value={inputData.slug}
                      onChange={(newValue) => {
                        setIsCustomEdited(true);
                        setInputData({ ...inputData, slug: newValue });
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
                          ...inputData,
                          slug: slugify(inputData.title),
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
                  value={inputData.content}
                  onChange={(newValue) =>
                    setInputData({ ...inputData, content: newValue })
                  }
                />
              </FormControl>
            </Stack>
          </TabPanel>

          <TabPanel>
            <Stack spacing={4} flex={1}>
              {propsData && <DeleteSection page={propsData} />}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormWrapper>
  );
};

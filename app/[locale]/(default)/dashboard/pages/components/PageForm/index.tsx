import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
} from '@/components/chakra';
import { CustomEditable, FormWrapper, TextEditor } from '@/components/client';
import {
  useAuth,
  useEffect,
  useLocale,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { ArrowUpIcon, RepeatIcon } from '@/icons';
import { Page, PageWithPayload, Locale, HttpMethod } from '@/types';
import { isEqual } from '@/utils/compare';
import { fetcher } from '@/utils/fetcher';
import slugify from 'slugify';

export type PageFormProps = {
  title?: string;
  backPath?: string;
  data?: PageWithPayload;
  translatedPages?: Page[];
  originalId?: string;
  translateTo?: Locale;
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

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (propsData) {
      const { title, slug, content } = Object.fromEntries(
        formData.entries()
      ) as { title: string; slug: string; content: string };

      const updatedPage = await fetcher<PageWithPayload>(
        `/api/pages/${propsData.id}`,
        {
          method: HttpMethod.PATCH,
          body: JSON.stringify({
            title,
            slug,
            content,
          }),
        }
      );

      if (updatedPage) {
        toast({ description: 'Update successfully' });
        router.refresh();
      }
    } else {
      if (!session) return;

      const { title, slug, content } = Object.fromEntries(
        formData.entries()
      ) as { title: string; slug: string; content: string };

      const createdPage = await fetcher<Page>('/api/pages', {
        method: HttpMethod.POST,
        body: JSON.stringify({
          title,
          slug,
          content,
          originalId,
          locale: translateTo ?? defaultLocale,
          authorId: session.user.id,
        }),
      });

      if (createdPage) {
        toast({ description: 'Published successfully' });
        router.refresh();
        router.push(`/dashboard/pages/${createdPage.id}`);
      }
    }

    setIsLoading(false);
  };

  return (
    <FormWrapper action={handleSubmit}>
      <Stack spacing={4} flex={1}>
        <Flex align="center" justify="space-between">
          <Stack direction="row" align="center"></Stack>
        </Flex>

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

          <Flex marginTop={2} align="center" gap={2} color="gray" minH="29px">
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
        <Flex width="100%" justify="end">
          <Button
            type="submit"
            isDisabled={isFormDirty}
            colorScheme={propsData ? 'blue' : 'green'}
            isLoading={isLoading}
            leftIcon={propsData ? <RepeatIcon /> : <ArrowUpIcon />}
          >
            {propsData ? 'Save' : 'Publish'}
          </Button>
        </Flex>
      </Stack>
    </FormWrapper>
  );
};

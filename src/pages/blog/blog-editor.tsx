'use client';
import { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Stack,
  Card,
  Input,
  Button,
  Divider,
  Heading,
  Spacer,
  useToast,
  Checkbox,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
} from '@chakra-ui/react';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import { TextEditor } from '@/components';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useAuth, usePostById } from '@/hooks';

type RequireInputType = {
  [key: string]: string;
};
export default function BlogEditor() {
  const toast = useToast();
  const { session } = useAuth();
  const route = useRouter();
  const { postId } = route.query;
  const { data } = usePostById(postId?.toString() ?? '');

  const [title, setTitle] = useState('');
  const [publishedAt, setPublishedAt] = useState<string | null>(
    new Date().toISOString()
  );
  const [content, setContent] = useState('');
  const [showActionPost, setShowActionPost] = useState(true);

  const handleSave = async () => {
    const userID = session?.user.id;
    const isOk = requiredInput({ title, content });
    if (!isOk) return;
    const data = await fetch('/api/pages/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.trim(),
        content,
        slug: slugify(title),
        publishedAt,
        locale: 'VI',
        authorId: userID,
      }),
    });

    if (data.status === 200) {
      toast({
        status: 'success',
        title: 'Successfully',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      resetState();
    } else {
      toast({
        status: 'error',
        description: data.statusText,
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const resetState = () => {
    setTitle('');
    setContent('');
    setPublishedAt(new Date().toISOString());
  };
  const requiredInput = (req: RequireInputType) => {
    let pass = true;
    Object.keys(req)?.map((key) => {
      const value = req[key].trim();
      if (!value) {
        pass = false;
        toast({
          status: 'warning',
          title: 'Input request',
          description: (
            <>
              <Box as="b" mr={1} textTransform="capitalize">
                {key}
              </Box>
              can not be empty
            </>
          ),
          duration: 4000,
          isClosable: true,
        });
      }
    });
    return pass;
  };
  return (
    <Container maxW="container.xl">
      <Heading size="lg">Tạo bài viết</Heading>
      <Stack spacing={1} direction="row">
        <Box w="80%">
          <Input
            width="100%"
            rounded={5}
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề..."
            size="sm"
            marginY={1}
          />

          <TextEditor onChange={(text) => setContent(text)} value={content} />
        </Box>
        <Box w="20%">
          <Card>
            <CardHeader borderBottom="1px solid #E2E8F0" p={2}>
              <Flex>
                <Box fontWeight={600}>Đăng</Box>
                <Spacer />
                <Box>
                  <Button
                    onClick={() => setShowActionPost(!showActionPost)}
                    size="xs"
                  >
                    <Icon
                      as={showActionPost ? ChevronDownIcon : ChevronUpIcon}
                    />
                  </Button>
                </Box>
              </Flex>
            </CardHeader>
            {showActionPost && (
              <CardBody p={2}>
                <Checkbox
                  onChange={(e) => {
                    const isPublished = e.target.checked;
                    setPublishedAt(
                      isPublished ? new Date().toDateString() : null
                    );
                  }}
                  isChecked={!!publishedAt}
                >
                  {!!publishedAt ? 'Công khai' : 'Riêng tư'}
                </Checkbox>
              </CardBody>
            )}
            {showActionPost && (
              <CardFooter>
                <Button
                  onClick={handleSave}
                  colorScheme="green"
                  size="sm"
                  width="100%"
                >
                  Save
                </Button>
              </CardFooter>
            )}
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}

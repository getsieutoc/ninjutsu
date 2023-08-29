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
import { PostList } from '@/components/Post';
import { TextEditor } from '@/components';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function PagePostEditor() {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState('');
  const [showActionPost, setShowActionPost] = useState(true);

  const handleSave = async () => {
    const data = await fetch('/api/pages/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.trim(),
        content,
        published,
        slug,
        locale: '',
        authorId: 'test-123',
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
    } else {
      toast({
        status: 'error',
        description: data.statusText,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl">
      <Heading size="lg">Tạo bài viết</Heading>
      <Stack spacing={1} direction="row">
        <Box w="80%">
          <Input
            width="100%"
            rounded={5}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề..."
            size="sm"
            marginY={1}
          />

          <TextEditor onChange={(text) => setContent(text)} />
          <br />
          <Divider />
          <PostList />
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
                  onChange={(e) => setPublished(e.target.checked)}
                  isChecked={published}
                >
                  {published ? 'Công khai' : 'Riêng tư'}
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

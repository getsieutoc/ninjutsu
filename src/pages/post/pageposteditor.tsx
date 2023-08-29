'use client';
import { useCallback, useState } from 'react';
import {
  Box,
  Checkbox,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  useToast,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';
import { PostList } from '@/components/Post';
import { TextEditor } from '@/components';

export default function PagePostEditor() {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState('');

  const handleSave = async (content: string) => {
    console.log(content);
    console.log(title);
    console.log(published);
    return;
    const data = await fetch('/api/pages/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.trim(),
        content,
        published,
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
      <HStack>
        <Box w="80%">
          <Heading size="lg">Tạo bài viết</Heading>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề..."
            w="50%"
            size="sm"
            my={1}
          />
          <Checkbox
            onChange={(e) => setPublished(e.target.checked)}
            isChecked={published}
            size="lg"
            mt={1}
            ml={1}
          >
            {published ? 'Công khai' : 'Riêng tư'}
          </Checkbox>
          <TextEditor onChange={(text) => setContent(text)} />
          <br />
          <Divider />
          <PostList />
        </Box>
        <Box w="20%">
          <Card>
            <CardHeader>Post</CardHeader>
            <CardBody></CardBody>
          </Card>
          
        </Box>
      </HStack>
    </Container>
  );
}

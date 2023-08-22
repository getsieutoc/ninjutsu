'use client';
import { useState } from 'react';
import { useSWR } from '@/hooks';
import { Checkbox, Container, Heading, Input } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// import { PrismaClient } from '@prisma/client';
const SunEditor = dynamic(() => import('../components/CustomSunEditor'), {
  ssr: false,
});

export default function PagePostEditor() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('api/pages/posts', fetcher);
  console.log('===>', data, error);
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(true);

  const handleSave = async (content: string) => {
    console.log(content);
    console.log(typeof content);
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
    console.log(data);
  };
  return (
    <Container maxW="container.lg">
      <Heading size="lg">Tạo bài viết</Heading>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề..."
        w="50%"
        size="sm"
        my={1}
      />
      <Checkbox isChecked={published} size="lg" mt={1} ml={1}>
        {published ? 'Công khai' : 'Riêng tư'}
      </Checkbox>
      <SunEditor onSave={handleSave} />
    </Container>
  );
}

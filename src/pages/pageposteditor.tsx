'use client';
import { Container, Heading, Input } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
// import { PrismaClient } from '@prisma/client';
const SunEditor = dynamic(() => import('../components/CustomSunEditor'), {
  ssr: false,
});

export default function PagePostEditor() {
  return (
    <Container maxW="container.lg">
      <Heading size="lg">Tạo bài viết</Heading>
      <Input placeholder="Tiêu đề..." w="50%" size="sm" my={1} />
      <SunEditor onSave={(content) => console.log(content)} />
    </Container>
  );
}

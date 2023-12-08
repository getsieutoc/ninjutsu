import { Box, Container, Heading } from '@/components/chakra';
import { HTMLParser } from '@/components/client';
import { getPage } from '@/services/pages';

export default async function DynamicPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getPage({ where: { slug } });

  if (!page) {
    // TODO: Make 404 display
    return 'not found';
  }

  return (
    <Container
      as={Box}
      maxW={{
        lg: 'container.lg',
        md: 'container.m',
        sm: 'container.sm',
        xl: 'container.xl',
      }}
    >
      <Heading as="h1" size="lg">
        {page.title}
      </Heading>

      <HTMLParser content={page.content} />
    </Container>
  );
}

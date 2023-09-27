import { Box, Container, Heading } from '@/components/chakra';
import { HTMLParser } from '@/components/client';
import { getPage } from '@/services/pages';
import { redirect } from 'next/navigation';

export default async function DynamicPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const page = await getPage({ where: { slug } });

  const foundTranslation = page?.translatedPages.find(
    (p) => p.locale === locale
  );

  if (foundTranslation?.locale === locale) {
    redirect(`/${locale}/${foundTranslation.slug}`);
  } else if (page?.originalPage?.locale === locale) {
    redirect(`/${locale}/${page?.originalPage.slug}`);
  }

  if (!page) {
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

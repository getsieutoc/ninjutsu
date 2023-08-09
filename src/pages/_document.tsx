import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@/components';
import { theme } from '@/utils/chakra';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import parser, { type HTMLReactParserOptions } from 'html-react-parser';
import { Box, BoxProps } from '@/components/chakra';

export type HTMLParserProps = {
  content: string;
  replace?: HTMLReactParserOptions['replace'];
  transform?: HTMLReactParserOptions['transform'];
  trim?: HTMLReactParserOptions['trim'];
} & BoxProps;

export const HTMLParser = ({
  content,
  replace,
  transform,
  trim,
  ...rest
}: HTMLParserProps) => {
  return <Box {...rest}>{parser(content, { replace, transform, trim })}</Box>;
};

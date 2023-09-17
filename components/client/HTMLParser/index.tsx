import ReactHtmlParser from '@orrisroot/react-html-parser';
import { Box, BoxProps } from '@/components/chakra';

export type HTMLParserProps = {
  content: string;
} & BoxProps;

export const HTMLParser = ({ content, ...rest }: HTMLParserProps) => {
  return <Box {...rest}>{ReactHtmlParser(content)}</Box>;
};

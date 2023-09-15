import { format } from 'date-fns';

import type { Post } from '@/types';
import {
  Flex,
  Box,
  Card,
  Spacer,
  Avatar,
  Button,
  Heading,
  CardBody,
  CardFooter,
  AvatarGroup,
} from '@/components/chakra';

import { HTMLParser } from '../HTMLParser';
import { NextLink } from '../NextLink';

type PostCardProps = {
  post: Post;
};
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Box>
      <Card height={400}>
        <CardBody padding={3}>
          <Flex>
            <Box fontSize="sm" color="gray.400">
              {format(post.createdAt, 'PPP')}
            </Box>
            <Spacer />
            <Box>
              <AvatarGroup size="xs" max={2}>
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
              </AvatarGroup>
            </Box>
          </Flex>
          <Box paddingY={3}>
            <Heading size="md">{post.title}</Heading>
          </Box>
          <HTMLParser
            __css={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
            }}
            maxHeight={300}
            content={post?.content}
          />
        </CardBody>
        <CardFooter padding={2}>
          <NextLink href={`/blog/${post.id}`} w="100%">
            <Button width="100%" size="sm">
              Read More
            </Button>
          </NextLink>
        </CardFooter>
      </Card>
    </Box>
  );
};

import type { FC, Post } from '@/types';
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
} from '@/components';
import moment from 'moment';

type PropTypes = {
  post: Post;
};
export const PostCard: FC<PropTypes> = ({ post }) => {
  return (
    <Box>
      <Card>
        <CardBody padding={3} maxHeight={300}>
          <Flex>
            <Box fontSize="sm" color="gray.400">
              {moment(post.createdAt).format('LL')}
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
          <Box
            __css={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
            }}
            as="div"
            dangerouslySetInnerHTML={{ __html: post?.content ?? '' }}
          />
        </CardBody>
        <CardFooter padding={2}>
          <Button width="100%" size="sm">
            Read More
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

import type { FC, Post } from '@/types';
import { Box, Card, CardBody, CardFooter, WrapItem } from '@/components';
import moment from 'moment';

type PropTypes = {
  post: Post;
};
export const PostCard: FC<PropTypes> = ({ post }) => {
  //   console.log(post);
  return (
    <WrapItem>
      <Card>
        <CardBody p={3}>
          <Box fontSize="sm" color="gray.400">
            {moment(post.createdAt).format('LL')}
          </Box>
          <Box></Box>
        </CardBody>
        <CardFooter>footer</CardFooter>
      </Card>
    </WrapItem>
  );
};

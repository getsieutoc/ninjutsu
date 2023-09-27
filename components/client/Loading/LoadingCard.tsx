import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  useColorModeValue,
} from '@/components/chakra';

export const LoadingCard = () => {
  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">
          <Skeleton height="24px" width="200px" />
        </Heading>
      </CardHeader>

      <CardBody paddingTop={0}>
        <Stack spacing={6} maxW="480px" minW="240px">
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Stack>
      </CardBody>

      <Divider color={footerBorder} />

      <CardFooter justify="end">
        <Stack direction="row">
          <Button isDisabled>...</Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};

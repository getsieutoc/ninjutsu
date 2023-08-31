import { type FC, useState, useEffect, ReactNode } from 'react';
import { Box, Button, HStack, Icon } from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

type PropTypes = {
  size?: 'md' | 'sm' | 'xs';
  pageIndex: number;
  limit: number;
  count: number;
  setPageIndex: (index: number) => void;
};
export const Pagination: FC<PropTypes> = ({
  count,
  limit,
  pageIndex,
  setPageIndex,
  size = 'sm',
}) => {
  const [items, setItems] = useState<ReactNode[]>([]);
  const [sumPages] = useState(Math.ceil(count / limit));

  useEffect(() => {
    if (pageIndex >= 0) {
      const itemTemp: ReactNode[] = [];
      for (let currentPage = 0; currentPage < sumPages; currentPage++) {
        itemTemp.push(
          <Button
            size={size}
            key={currentPage}
            isDisabled={pageIndex === currentPage}
            onClick={() => setPageIndex(currentPage)}
            display={
              pageIndex > currentPage + 2 || pageIndex < currentPage - 2
                ? 'none'
                : ''
            }
          >
            {currentPage + 1}
          </Button>
        );
      }
      setItems([...itemTemp]);
    }
  }, [pageIndex]);

  const goToLastPage = () => {
    setPageIndex(sumPages - 1);
  };
  return (
    <Box>
      <HStack spacing={1}>
        <Button
          onClick={() => setPageIndex(0)}
          size={size}
          isDisabled={!pageIndex}
        >
          <Icon as={ArrowLeftIcon} boxSize={3} />
        </Button>
        <Button
          onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : 0)}
          isDisabled={!pageIndex}
          size={size}
        >
          <Icon as={ChevronLeftIcon} boxSize={4} />
        </Button>
        {/* <Button display={pageIndex < 5 ? 'none' : ''} size={size} isDisabled>
          ...
        </Button> */}
        {items}
        {/* <Button
          display={pageIndex === sumPages ? 'none' : ''}
          size={size}
          isDisabled
        >
          ...
        </Button> */}
        <Button
          onClick={() =>
            setPageIndex(sumPages > pageIndex ? pageIndex + 1 : sumPages)
          }
          size={size}
          isDisabled={pageIndex >= sumPages - 1}
        >
          <Icon as={ChevronRightIcon} boxSize={4} />
        </Button>
        <Button
          onClick={goToLastPage}
          size={size}
          isDisabled={pageIndex >= sumPages - 1}
        >
          <Icon as={ArrowRightIcon} boxSize={3} />
        </Button>
      </HStack>
    </Box>
  );
};

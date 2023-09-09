'use client';

import { type FC, useState } from 'react';
import { Box, Button, HStack, Icon, Input, Select } from '@/components/chakra';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

type PropTypes = {
  size?: 'md' | 'sm' | 'xs';
  pageIndex: number;
  take?: number;
  count: number;
  setTake?: (take: number) => void;
  setPageIndex: (index: number) => void;
};
export const Pagination: FC<PropTypes> = ({
  count,
  take = 25,
  pageIndex,
  setPageIndex,
  setTake,
  size = 'sm',
}) => {
  const [sumPages] = useState(Math.ceil(count / take));

  return (
    <Box>
      <HStack spacing={1}>
        <Button
          onClick={() => setPageIndex(1)}
          size={size}
          isDisabled={pageIndex <= 1}
        >
          <Icon as={ArrowLeftIcon} boxSize={3} />
        </Button>
        <Button
          onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : 0)}
          isDisabled={pageIndex <= 1}
          size={size}
        >
          <Icon as={ChevronLeftIcon} boxSize={4} />
        </Button>
        <Input
          min={1}
          type="number"
          max={sumPages}
          value={pageIndex}
          size={size}
          textAlign="center"
          width={20}
          onChange={(e) => setPageIndex(Number(e.target.value))}
          placeholder="Go to page:"
        />
        <Button
          onClick={() =>
            setPageIndex(sumPages > pageIndex ? pageIndex + 1 : sumPages)
          }
          size={size}
          isDisabled={pageIndex >= sumPages}
        >
          <Icon as={ChevronRightIcon} boxSize={4} />
        </Button>
        <Button
          onClick={() => setPageIndex(sumPages)}
          size={size}
          isDisabled={pageIndex >= sumPages}
        >
          <Icon as={ArrowRightIcon} boxSize={3} />
        </Button>
        <Box>
          Page{' '}
          <Box as="b">
            {pageIndex} of {sumPages}
          </Box>
        </Box>
        <Box>
          <Select
            onChange={(e) => setTake && setTake(Number(e.target.value))}
            placeholder={'show ' + take.toString()}
            size={size}
          >
            <option value="5">5</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Select>
        </Box>
      </HStack>
    </Box>
  );
};

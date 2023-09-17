import { Icon, type IconProps as Props } from '@/components/chakra';
import { TbCircleDashed } from 'react-icons/tb';

export const CircleDashedIcon = (p: Props) => (
  <Icon as={TbCircleDashed} {...p} />
);

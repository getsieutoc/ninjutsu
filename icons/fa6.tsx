import { Icon, type IconProps as Props } from '@/components/chakra';
import { FaGithub, FaGlobe } from 'react-icons/fa6';

export const GithubIcon = (p: Props) => <Icon as={FaGithub} {...p} />;
export const GlobeIcon = (p: Props) => <Icon as={FaGlobe} {...p} />;

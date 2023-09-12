import { Icon, type IconProps as Props } from '@/components/chakra';
import {
  FaRegImage,
  FaRegFile,
  FaRegFileImage,
  FaGithub,
  FaGlobe,
  FaSitemap,
} from 'react-icons/fa6';

export const FileIcon = (p: Props) => <Icon as={FaRegFile} {...p} />;
export const FileImageIcon = (p: Props) => <Icon as={FaRegFileImage} {...p} />;
export const GithubIcon = (p: Props) => <Icon as={FaGithub} {...p} />;
export const GlobeIcon = (p: Props) => <Icon as={FaGlobe} {...p} />;
export const ImageIcon = (p: Props) => <Icon as={FaRegImage} {...p} />;
export const SitemapIcon = (p: Props) => <Icon as={FaSitemap} {...p} />;

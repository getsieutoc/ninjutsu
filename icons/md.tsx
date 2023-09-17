import { Icon, type IconProps as P } from '@/components/chakra';
import {
  MdBarChart,
  MdBusiness,
  MdDashboard,
  MdDataExploration,
  MdFlag,
  MdInsertChart,
  MdLogout,
  MdOutlineDesignServices,
  MdPalette,
  MdPreview,
} from 'react-icons/md';

export const Business = (p: P) => <Icon as={MdBusiness} {...p} />;
export const DataExploration = (p: P) => <Icon as={MdDataExploration} {...p} />;
export const OutlineDesignServices = (p: P) => (
  <Icon as={MdOutlineDesignServices} {...p} />
);
export const DashboardIcon = (p: P) => <Icon as={MdDashboard} {...p} />;
export const InsertChartIcon = (p: P) => <Icon as={MdInsertChart} {...p} />;
export const LogoutIcon = (p: P) => <Icon as={MdLogout} {...p} />;
export const PaletteIcon = (p: P) => <Icon as={MdPalette} {...p} />;
export const PreviewIcon = (p: P) => <Icon as={MdPreview} {...p} />;
export const BarChartIcon = (p: P) => <Icon as={MdBarChart} {...p} />;
export const FlagIcon = (p: P) => <Icon as={MdFlag} {...p} />;

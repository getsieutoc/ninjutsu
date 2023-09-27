import { i18n } from '@/configs/i18n.config';
import { useParams } from '@/hooks';
import { Locale } from '@/types';

export const useLocale = () => {
  const { locale: currentLocale } = useParams();

  return {
    defaultLocale: i18n.defaultLocale,
    currentLocale: currentLocale as Locale,
  };
};

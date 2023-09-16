import { i18n } from '@/configs/i18n.config';
import { useCookies, useParams } from '@/hooks';
import { Locale } from '@/types';

export const useLocale = () => {
  const { locale: currentLocale } = useParams();

  const cookies = useCookies();
  const cookieLocale = cookies.get('NEXT_LOCALE');

  return {
    defaultLocale: i18n.defaultLocale,
    currentLocale: (currentLocale ?? cookieLocale) as Locale,
  };
};

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@/components/chakra';
import { AddIcon, CheckCircleIcon, ChevronDownIcon, GlobeIcon } from '@/icons';
import { i18n } from '@/configs/i18n.config';
import { useLocale, useRouter } from '@/hooks';
import { PageWithPayload } from '@/types';

export type TranslationsProps = {
  data: PageWithPayload;
};

export const Translations = ({ data }: TranslationsProps) => {
  const router = useRouter();
  const { currentLocale, defaultLocale } = useLocale();

  const { translatedPages } = data;

  const getTranslationIcon = (locale: string) => {
    const foundTranslated = translatedPages?.find((p) => p.locale === locale);

    if (foundTranslated || data.locale === locale || currentLocale === locale) {
      return <CheckCircleIcon boxSize="3" />;
    }

    return <AddIcon />;
  };

  const handleNewTranslatedPage = (locale: string) => {
    const foundTranslated = translatedPages?.find((p) => p.locale === locale);

    if (foundTranslated) {
      // Go to edit translated page version
      router.push(`/dashboard/pages/${foundTranslated.id}`);
    } else if (data.originalId) {
      // Go to edit original page version
      router.push(`/dashboard/pages/${data.originalId}`);
    } else {
      // Or else go to create new page
      router.push(
        `/dashboard/pages/new?translateTo=${locale}&originalId=${data.id}`
      );
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="outline"
        size="sm"
      >
        <GlobeIcon /> Translations
      </MenuButton>
      <MenuList>
        {i18n.locales.map(({ label, value }) => {
          return (
            <MenuItem
              key={value}
              isDisabled={data.locale === value}
              icon={getTranslationIcon(value)}
              onClick={() => handleNewTranslatedPage(value)}
            >
              {label} {defaultLocale === value ? '(default)' : ''}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

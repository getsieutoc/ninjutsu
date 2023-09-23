import { extendTheme, type UseToastOptions } from '@chakra-ui/react';

export const toastOptions: UseToastOptions = {
  position: 'top-right',
  duration: 1000,
  status: 'success',
  isClosable: true,
};

const colorModeInLocalStorage =
  typeof window !== 'undefined'
    ? window.localStorage.getItem('chakra-ui-color-mode')
    : 'system';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: colorModeInLocalStorage === 'system',
};

const colors = {
  brand: {
    50: '#F78DA7',
    100: '#F57393',
    200: '#F3597F',
    300: '#F23F6C',
    400: '#F02558',
    500: '#E91046',
    600: '#CF0E3F',
    700: '#B50D37',
    800: '#9B0B2F',
    900: '#810927',
  },
  yellowAlpha: {
    50: 'rgba(236, 201, 75, 0.04)',
    100: 'rgba(236, 201, 75, 0.06)',
    200: 'rgba(236, 201, 75, 0.08)',
    300: 'rgba(236, 201, 75, 0.16)',
    400: 'rgba(236, 201, 75, 0.24)',
    500: 'rgba(236, 201, 75, 0.36)',
    600: 'rgba(236, 201, 75, 0.48)',
    700: 'rgba(236, 201, 75, 0.64)',
    800: 'rgba(236, 201, 75, 0.80)',
    900: 'rgba(236, 201, 75, 0.92)',
  },
};

const styles = {
  global: {
    '.some-global-class': {
      paddingY: 2,
    },

    a: {
      // Fix issue links wrap outside of button have ugly sharp corners
      borderRadius: 'md',
    },
  },
};

const components = {
  Input: {
    defaultProps: {
      size: 'lg',
    },
    variants: {
      expanding: () => ({
        field: {
          // Merge default styles
          // ...mode('light')(props).field,
          // ...mode('dark')(props).field,
          background: 'transperant',
          width: '50%',
          transition: 'width 0.3s',
          _focus: {
            width: '100%',
          },
        },
      }),
    },
  },
};

export const theme = extendTheme({ config, colors, components, styles });

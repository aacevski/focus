import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import { colors } from './colors';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  components: {
    Input: {
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: 'primary.500',
              borderWidth: '3px',
            },
          },
        },
      },
    },
  },
});

export default theme;

import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';

const theme = extendTheme({
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

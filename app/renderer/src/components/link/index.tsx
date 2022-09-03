import NextLink, { LinkProps } from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';

type Props = LinkProps & ChakraLinkProps;

const Link = ({ href, children, ...rest }: Props) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...rest} color={mode('black', 'white')}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';

type Props = ChakraLinkProps;

const Link = ({ href, children, ...rest }: Props) => {
  return (
    <ChakraLink as={ReactRouterLink} to={href} color={mode('black', 'white')} {...rest}>
      {children}
    </ChakraLink>
  );
};

export default Link;

import { Link as RouterDomLink } from "react-router-dom";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';

type Props = ChakraLinkProps;

const Link = ({ href, children, ...rest }: Props) => {
  return (
    <RouterDomLink to={href!}>
      <ChakraLink  color={mode('black', 'white')}>
        {children}
      </ChakraLink>
    </RouterDomLink>
  );
};

export default Link;

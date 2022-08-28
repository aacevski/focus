import { Spinner, Stack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Stack h="100vh" justify="center" align="center">
      <Spinner thickness="4px" emptyColor='gray.200' speed="0.65s" color="#89CFF0" size="xl" />
    </Stack>
  );
};

export default Home;

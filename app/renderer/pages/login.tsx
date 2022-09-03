import { Button, chakra, Divider, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Icon, Input, Text, useColorModeValue as mode, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { FaDiscord } from 'react-icons/fa';

import fetcher from '../src/axios';
import Link from '../src/components/link';
import { TOKEN } from '../src/constants/local-storage';
import { writeToLocalStorage } from '../src/utils/local-storage';
import { LoginSchema } from '../src/validation/login-schema';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { mutateAsync } = useMutation(['/login'], ({ email, password }: LoginForm) => fetcher.post('/auth/login', {
    email,
    password,
  }));

  return (
    <VStack h="100vh" align="center" justify="center">
      <VStack bg={mode('white', 'blackAlpha.400')} p={6} rounded="md" w="full" spacing={5} maxW="400px">
        <VStack spacing={8} align="center" w="full">
          <Heading size="lg">
            Log In
          </Heading>
          <VStack spacing={4} w="full">
            <Button w="full" fontSize="sm" leftIcon={<Icon as={FaDiscord} />} variant="outline">Continue with Discord</Button>
            <HStack align="center" w="full">
              <Divider />
              <chakra.span color="gray.500" whiteSpace="nowrap">
                or continue with
              </chakra.span>
              <Divider />
            </HStack>
          </VStack>
        </VStack>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values: LoginForm) => {
            const { email, password } = values;

            const { data: { token } } = await mutateAsync({ email, password });

            writeToLocalStorage(TOKEN, token);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4} align="start">
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button w="full" type="submit">Submit</Button>
              </VStack>
            </form>
          )}
        </Formik>
        <Text fontSize="sm" color="gray.500">
          No account yet?
          {' '}
          <Link href="/sign-up">Sign Up</Link>
        </Text>
      </VStack>
    </VStack>
  );
};

export default Login;

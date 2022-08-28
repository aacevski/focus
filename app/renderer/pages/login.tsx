import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Field, Formik } from "formik";
import { FaDiscord } from 'react-icons/fa';
import fetcher from "../src/axios";

type LoginForm = {
  email: string;
  password: string;
}

const Login = () => {
  const { mutateAsync } = useMutation(['/login'], ({ email, password }: LoginForm) => fetcher.post('/auth/login', {
    email,
    password
  }));

  return (
    <VStack bg="gray.100" h="100vh" align="center" justify="center">
      <VStack bg="white" p={6} rounded="md" w={72} spacing={5}>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values: LoginForm) => {
            const { email, password } = values;

            const token = await mutateAsync({ email, password })

            console.log(token)
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.email && touched.password}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field as={Input} id="email" name="email" variant="filled" />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field as={Input} id="password" name="password" type="password" variant="filled" />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="lightBlue" w="full">
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
        <Divider />
        <VStack spacing={4}>
          <Text fontSize="xs" color="#92a3b3" fontWeight='semibold'>...or login with</Text>
          <Button w="full" leftIcon={<Icon as={FaDiscord} />}>
            Discord
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Login;
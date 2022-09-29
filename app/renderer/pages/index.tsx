import { Alert, AlertIcon, Avatar, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Formik, Field } from 'formik';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import fetcher from '../src/axios';
import { useUser } from '../src/providers/user-provider';
import { UserUpdatedResponse } from '../src/types/user';
import { OnboardingSchema } from '../src/validation/onboarding-schema';

const Home = () => {
  const [uploadedPicture, setUploadedPicture] = useState<File>(null);
  const { user, showOnboardingModal, setUser } = useUser();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    } });
    
    const onDrop = useCallback((acceptedFile) => {
    setUploadedPicture(acceptedFile[0]);
  }, []);
    
  const { mutateAsync, isLoading, error, isError } = useMutation(
    ['/update-user'],
    async (formData : FormData) => fetcher.put(`/users/${user.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    { onSuccess: (data: UserUpdatedResponse) => {
      const { data: { firstName, lastName, profilePicture } } = data;
      if (data.data.profilePicture){
        setUser({ ...user, firstName, lastName, profilePicture });
      } else {
        setUser({ ...user, firstName, lastName });
      }
    } },
  );

  return (
    <Stack h="100vh" justify="center" align="center">
      <Modal isOpen={showOnboardingModal} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
              }}
              validationSchema={OnboardingSchema}
              onSubmit={async (values) => {
                const formData = new FormData();
                const { firstName, lastName } = values;
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);
                if (uploadedPicture){
                  formData.append('profilePicture', uploadedPicture);
                }
                await mutateAsync(formData);
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <VStack spacing={4} align="start">
                    <FormControl isInvalid={errors.firstName && touched.firstName}>
                      <FormLabel htmlFor="firstName">First name</FormLabel>
                      <Field
                        as={Input}
                        id="firstName"
                        name="firstName"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                      <FormLabel htmlFor="lastName">Last name</FormLabel>
                      <Field
                        as={Input}
                        id="lastName"
                        name="lastName"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    </FormControl>

                    <Box
                      bg={uploadedPicture ? 'green.200' : 'gray.200'}
                      padding={6}
                      rounded="lg"
                      cursor="pointer"
                      _hover={uploadedPicture ? { bg: 'green.200' } : { bg: 'primary.200' }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop the files here ...</p>
                          : <p>Drag and drop some files here, or click to select files</p>
                      }
                    </Box>

                    <Button w="full" type="submit" isLoading={isLoading}>Submit</Button>
                    {isError && (
                      <Alert status="error">
                        <AlertIcon />
                        {error as string}
                      </Alert>
                    )}
                  </VStack>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      { user?.profilePicture && <Avatar src={user.profilePicture} size="full" />}
    </Stack>
  );
};

export default Home;

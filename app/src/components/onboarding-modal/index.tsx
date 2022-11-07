import { Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormLabel, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import fetcher from '../../axios';
import { useUser } from '../../providers/user-provider';
import { UserUpdatedResponse } from '../../types/user';
import { OnboardingSchema } from '../../validation/onboarding-schema';

const OnboardingModal = () => {
  const [uploadedPicture, setUploadedPicture] = useState<File | null>(null);
  const { user, showOnboardingModal, setUser } = useUser();

  const onDrop = useCallback((acceptedFile: File[]) => {
    setUploadedPicture(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const { mutateAsync, isLoading, error, isError } = useMutation(
    ['/update-user'],
    async (formData: FormData) => fetcher.put(`/users/${user?.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    {
      onSuccess: (data: UserUpdatedResponse) => {
        const { data: { firstName, lastName, profilePicture } } = data;
        if (user) {
          if (data.data.profilePicture) {
            setUser({ ...user, firstName, lastName, profilePicture });
          } else {
            setUser({ ...user, firstName, lastName });
          }
        }
      },
    },
  );

  return (
    <Modal isOpen={showOnboardingModal} onClose={() => { }}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={6}>
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
              if (uploadedPicture) {
                formData.append('profilePicture', uploadedPicture);
              }
              await mutateAsync(formData);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing={4} align="start">
                  <FormControl isInvalid={!!errors.firstName && touched.firstName}>
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
                    bg={uploadedPicture ? 'purple.500' : 'gray.800'}
                    padding={6}
                    rounded="lg"
                    cursor="pointer"
                    w="full"
                    textAlign="center"
                    transition="all 0.3s"
                    _hover={uploadedPicture ? { bg: 'purple.600' } : { bg: 'gray.600' }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {
                      (!uploadedPicture && isDragActive) ?
                        <Text fontWeight="bold">Drop the files here ...</Text>
                        : <Text fontWeight="bold">Drag and drop some files here, or click to select files</Text>

                    }

                    {uploadedPicture && (
                      <Image
                        src={URL.createObjectURL(uploadedPicture)}
                      />
                    )}
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
  );
};

export default OnboardingModal;

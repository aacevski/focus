import { object, string } from 'yup';

export const OnboardingSchema = object({
  firstName: string().required('FirstName is required'),
  lastName: string().required('LastName is required'),
});

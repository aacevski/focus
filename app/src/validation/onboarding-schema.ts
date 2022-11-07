import { object, string } from 'yup';

export const OnboardingSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
});

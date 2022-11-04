import { object, string } from 'yup';

export const LoginSchema = object({
  email: string().email("Email isn't valid").required('Email is required'),
  password: string().required('Password is required'),
});

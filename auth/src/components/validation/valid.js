import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Max is 30 characters'),
});
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './useAuth';
import { isAxiosError } from '../../../utils/errorUtils';

const useLoginForm = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await login(values.username, values.password);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error(error);
          setStatus(error.response?.data?.message || 'Failed to login.');
        } else {
          console.error('Unexpected error:', error);
          setStatus('Failed to login.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik };
};

export default useLoginForm;
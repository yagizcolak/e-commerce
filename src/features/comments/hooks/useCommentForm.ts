import { useFormik } from 'formik';
import * as Yup from 'yup';

interface useCommentFormProps {
    onAddComment: (content: string, rating: number) => void;
}

const useCommentForm = ({ onAddComment }: useCommentFormProps) => {

    const formik = useFormik({
        initialValues: {
          content: '',
          rating: 0,
        },
        validationSchema: Yup.object({
          content: Yup.string()
            .max(500, 'Comment must be 500 characters or less')
            .required('Comment is required'),
          rating: Yup.number()
            .min(1, 'Minimum rating is 1')
            .max(5, 'Maximum rating is 5')
            .required('Rating is required'),
        }),
        onSubmit: (values, { resetForm }) => {
          onAddComment(values.content, values.rating);
          resetForm();
        },
      });

    return { formik };
};

export default useCommentForm;
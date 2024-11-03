import React from 'react';
import { Box, TextField, IconButton, Rating, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CommentFormProps {
  onAddComment: (content: string, rating: number) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
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

  return (
    <Paper elevation={2} sx={{ padding: 2, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add a Comment
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Rating
          name="rating"
          value={formik.values.rating}
          onChange={(_, newValue) => formik.setFieldValue('rating', newValue)}
          sx={{ mb: 2 }}
        />
        {formik.touched.rating && formik.errors.rating ? (
          <Typography variant="caption" color="error">
            {formik.errors.rating}
          </Typography>
        ) : null}
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            color="primary"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            sx={{
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </form>
    </Paper>
  );
};

export default CommentForm;
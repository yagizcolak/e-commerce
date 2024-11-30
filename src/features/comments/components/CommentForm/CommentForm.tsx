import React from "react";
import { Box, IconButton, Rating, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Typography, TextField } from "../../../../components";
import useCommentForm from "../../hooks/useCommentForm";
import styles from "./CommentForm.module.scss";

interface CommentFormProps {
  onAddComment: (content: string, rating: number) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const { formik } = useCommentForm({ onAddComment });

  return (
    <Paper
      elevation={2}
      className={styles.commentFormPaper}
      data-testid="comment-form"
    >
      <Typography variant="h6" className={styles.title}>
        Add a Comment
      </Typography>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.ratingContainer}>
          <Rating
            name="rating"
            value={formik.values.rating}
            onChange={(_, newValue) => formik.setFieldValue("rating", newValue)}
            data-testid="rating-input"
          />
          {Boolean(formik.errors.rating) ? (
            <Typography variant="caption" className={styles.errorText}>
              {formik.errors.rating}
            </Typography>
          ) : null}
        </div>
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          name="content"
          data-testid="content-input"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          className={styles.textField}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <Box className={styles.buttonContainer}>
          <IconButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={styles.sendButton}
            data-testid="submit-button"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </form>
    </Paper>
  );
};

export default CommentForm;

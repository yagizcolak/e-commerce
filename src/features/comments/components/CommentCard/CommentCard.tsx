import React from "react";
import { Box, Rating, Paper } from "@mui/material";
import { Comment } from "../../../../types/Comment";
import { Typography } from "../../../../components";
import styles from "./CommentCard.module.scss";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Paper elevation={2} className={styles.commentCard}>
      <Box className={styles.header}>
        <Typography
          variant="subtitle1"
          className={styles.username}
          data-testid="comment-username"
        >
          {comment.username}
        </Typography>
        <Typography
          variant="body2"
          className={styles.date}
          data-testid="comment-date"
        >
          {new Date(comment.date).toLocaleDateString()}
        </Typography>
      </Box>
      <Rating
        name={`rating-${comment.id}`}
        value={comment.rating}
        readOnly
        precision={0.5}
        size="small"
        data-testid="comment-rating"
      />
      <Typography
        variant="body2"
        className={styles.content}
        data-testid="comment-content"
      >
        {comment.content}
      </Typography>
    </Paper>
  );
};

export default CommentCard;

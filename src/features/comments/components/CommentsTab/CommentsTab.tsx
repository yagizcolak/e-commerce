import React from "react";
import { Box } from "@mui/material";
import CommentCard from "../CommentCard/CommentCard";
import CommentForm from "../CommentForm/CommentForm";
import { Comment } from "../../../../types/Comment";
import { Typography } from "../../../../components";
import styles from "./CommentsTab.module.scss";

interface CommentsTabProps {
  comments: Comment[];
  onAddComment: (content: string, rating: number) => void;
}

const CommentsTab: React.FC<CommentsTabProps> = ({
  comments,
  onAddComment,
}) => {
  return (
    <Box
      className={styles.commentsTabContainer}
      data-testid="comments-tab-container"
    >
      {comments.length === 0 ? (
        <Typography
          variant="body1"
          className={styles.noComment}
          data-testid="no-comments-message"
        >
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        <Box
          className={styles.commentsContainer}
          data-testid="comments-container"
        >
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Box>
      )}

      <CommentForm onAddComment={onAddComment} />
    </Box>
  );
};

export default CommentsTab;

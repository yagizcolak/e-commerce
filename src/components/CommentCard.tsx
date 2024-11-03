import React from 'react';
import { Box, Typography, Rating, Paper } from '@mui/material';
import { Comment } from '../types/Product';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight="bold">
          {comment.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(comment.date).toLocaleDateString()}
        </Typography>
      </Box>
      <Rating
        name={`rating-${comment.id}`}
        value={comment.rating}
        readOnly
        precision={0.5}
        size="small"
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {comment.content}
      </Typography>
    </Paper>
  );
};

export default CommentCard;
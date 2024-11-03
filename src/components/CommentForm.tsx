import React, { useState } from 'react';
import { Box, TextField, IconButton, Rating, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface CommentFormProps {
  onAddComment: (content: string, rating: number) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (content.trim() && rating !== null) {
      onAddComment(content, rating);
      setContent('');
      setRating(null);
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: 2, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add a Comment
      </Typography>
      <Rating
        name="new-rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          color="primary"
          onClick={handleSubmit}
          disabled={!content.trim() || rating === null}
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
    </Paper>
  );
};

export default CommentForm;
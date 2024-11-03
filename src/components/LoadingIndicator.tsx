import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingIndicator: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingIndicator;
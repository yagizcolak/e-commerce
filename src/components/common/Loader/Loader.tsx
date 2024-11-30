// src/components/common/Loader/Loader.tsx

import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './Loader.module.scss';

const Loader: React.FC = () => (
  <Box className={styles.loader} data-testid="loader">
    <CircularProgress role="progressbar" />
  </Box>
);

export default Loader;
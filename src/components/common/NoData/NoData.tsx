// src/components/common/NoData/NoData.tsx

import React from 'react';
import { Box } from '@mui/material';
import Typography from '../Typography/Typography';
import styles from './NoData.module.scss';

interface NoDataProps {
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ message = 'No data available.' }) => {
  return (
    <Box className={styles.noData}>
      <Typography variant="h6" className={styles.noDataText}>
        {message}
      </Typography>
    </Box>
  );
};

export default NoData;
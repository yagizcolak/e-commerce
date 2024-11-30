// src/components/common/NotificationSnackbar/NotificationSnackbar.tsx

import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import styles from './NotificationSnackbar.module.scss';

interface NotificationSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  autoHideDuration?: number;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
}

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      data-testid="notification-snackbar"
    >
      <Alert onClose={onClose} severity={severity} className={styles.alert}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
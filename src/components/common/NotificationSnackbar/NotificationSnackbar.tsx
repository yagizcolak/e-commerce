import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import styles from "./NotificationSnackbar.module.scss";

/** Props for NotificationSnackbar component */
interface NotificationSnackbarProps {
  /** Controls whether the snackbar is open */
  open: boolean;
  /** Message to display in the snackbar */
  message: string;
  /** Severity level of the alert */
  severity: AlertColor;
  /** Handler called when the snackbar is closed */
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  /** Duration before the snackbar auto hides (in ms) */
  autoHideDuration?: number;
  /** Position of the snackbar on the screen */
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

/**
 * `NotificationSnackbar` displays a dismissible alert message.
 */
const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
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

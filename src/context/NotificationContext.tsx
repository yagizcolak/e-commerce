// src/context/NotificationContext.tsx
import React, { createContext, useState, useCallback, useContext, ReactNode } from "react";
import { NotificationSnackbar } from "../components";

export enum NotificationSeverity {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

interface Notification {
  message: string;
  severity: NotificationSeverity;
}

interface NotificationContextProps {
  showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);


export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((notification: Notification) => {
    setNotification(notification);
  }, []);

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <NotificationSnackbar
          open={Boolean(notification)}
          message={notification.message}
          severity={notification.severity}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

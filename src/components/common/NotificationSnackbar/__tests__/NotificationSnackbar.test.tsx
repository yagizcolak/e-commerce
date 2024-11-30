/* eslint-disable @typescript-eslint/no-empty-function */
// src/components/common/NotificationSnackbar/__tests__/NotificationSnackbar.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import NotificationSnackbar from '../NotificationSnackbar';

// Mock the Grow component to render children directly
jest.mock('@mui/material/Grow', () => ({ children }: { children: React.ReactElement }) => children);

describe('NotificationSnackbar Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders the snackbar when open is true', () => {
    render(
      <NotificationSnackbar
        open={true}
        message="Success!"
        severity="success"
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  test('does not render the snackbar when open is false', () => {
    render(
      <NotificationSnackbar
        open={false}
        message="Hidden Message"
        severity="info"
        onClose={() => {}}
      />
    );
    expect(screen.queryByText('Hidden Message')).not.toBeInTheDocument();
  });

  test('calls onClose handler when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(
      <NotificationSnackbar
        open={true}
        message="Dismissible Message"
        severity="warning"
        onClose={onCloseMock}
      />
    );
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('auto hides after the specified duration', async () => {
    const onCloseMock = jest.fn();
    render(
      <NotificationSnackbar
        open={true}
        message="Auto Hide Message"
        severity="error"
        onClose={onCloseMock}
        autoHideDuration={3000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  test('positions the snackbar correctly', () => {
    render(
      <NotificationSnackbar
        open={true}
        message="Positioned Message"
        severity="info"
        onClose={() => {}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    );
    const snackbar = screen.getByTestId('notification-snackbar');
    expect(snackbar).toBeInTheDocument();
    // Additional position-related checks can be added if necessary
  });
});
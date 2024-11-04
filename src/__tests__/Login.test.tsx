import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';

jest.mock('jose', () => ({
    decodeJwt: jest.fn(),
  }));

describe('Login Component', () => {
  const mockLogin = jest.fn();

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ token: null, login: mockLogin, logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders username and password fields and sign-in button', () => {
    renderLogin();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows user to input username and password', () => {
    renderLogin();

    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'user123' } });

    expect(usernameInput.value).toBe('user');
    expect(passwordInput.value).toBe('user123');
  });

  test('calls login function when form is submitted', async () => {
    renderLogin();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'user123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user', 'user123');
    });
  });
});
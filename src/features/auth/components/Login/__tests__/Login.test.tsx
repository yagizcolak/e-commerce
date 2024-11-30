// src/features/auth/components/Login/__tests__/Login.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { AuthContextType } from "../../../types/authTypes";

// Mock the logo SVG import
jest.mock("../../../../../assets/logo.svg", () => "logo.svg");

// Mock the login function
const mockLogin = jest.fn();

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock 'jose'
jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("Login Component", () => {
  const theme = createTheme();

  const renderWithProviders = () => {
    const authContextValue: AuthContextType = {
      token: null,
      login: mockLogin,
      logout: jest.fn(),
    };

    return render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <ThemeProvider theme={theme}>
            <Login />
          </ThemeProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Login component", () => {
    renderWithProviders();

    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("calls login function when form is submitted with valid inputs", async () => {
    renderWithProviders();

    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(usernameField, { target: { value: "user" } });
    fireEvent.change(passwordField, { target: { value: "user123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("user", "user123");
    });
  });

  test("toggles password visibility when visibility button is clicked", () => {
    renderWithProviders();

    const passwordField = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const visibilityButton = screen.getByTestId("visibility-button");

    // Initially, the password field should have type 'password'
    expect(passwordField.type).toBe("password");

    // Click the visibility button
    fireEvent.click(visibilityButton);

    // Now, the password field should have type 'text'
    expect(passwordField.type).toBe("text");

    // Click again to toggle back
    fireEvent.click(visibilityButton);

    expect(passwordField.type).toBe("password");
  });
});
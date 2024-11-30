// src/components/layouts/Header/__tests__/Header.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../../features/auth/context/AuthProvider";
import { ColorModeContext } from "../../../../context/ColorModeContext";
import { CurrencyContext, Currency } from "../../../../context/CurrencyContext";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("Header Component", () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  const mockLogout = jest.fn();
  const mockToggleColorMode = jest.fn();
  const mockSetCurrency = jest.fn();

  const mockAuthContext = {
    user: { id: 1, name: "Test User" },
    token: "",
    login: jest.fn(),
    logout: mockLogout,
  };

  const theme = createTheme();

  const renderWithProviders = (colorModeValue: PaletteMode = "light") => {
    const mockColorModeContext = {
      mode: colorModeValue,
      toggleColorMode: mockToggleColorMode,
      setMode: jest.fn(),
    };

    const mockCurrencyContext = {
      currency: "USD" as Currency,
      setCurrency: mockSetCurrency,
    };

    return render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <ColorModeContext.Provider value={mockColorModeContext}>
            <CurrencyContext.Provider value={mockCurrencyContext}>
              <ThemeProvider theme={theme}>
                <Header />
              </ThemeProvider>
            </CurrencyContext.Provider>
          </ColorModeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  test("renders the header with default elements", () => {
    renderWithProviders();

    expect(screen.getByText("CREA")).toBeInTheDocument();
    expect(screen.getByTestId("home-button")).toBeInTheDocument();
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
    expect(screen.getByTestId("currency-selector")).toBeInTheDocument();
    expect(screen.getByTestId("dark-mode-button")).toBeInTheDocument();

    // Verify that the correct icon is rendered when mode is 'light'
    expect(screen.getByTestId("brightness4-icon")).toBeInTheDocument();
  });

  test("renders Brightness7 icon when color mode is 'dark'", () => {
    renderWithProviders("dark");

    expect(screen.getByTestId("dark-mode-button")).toBeInTheDocument();
    // Verify that the correct icon is rendered when mode is 'dark'
    expect(screen.getByTestId("brightness7-icon")).toBeInTheDocument();
  });

  test("navigates to products when home button is clicked", () => {
    renderWithProviders();

    const homeButton = screen.getByTestId("home-button");
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  test("logs out and navigates to login when logout button is clicked", () => {
    renderWithProviders();

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("toggles dark mode when dark mode button is clicked", () => {
    renderWithProviders();

    const darkModeButton = screen.getByTestId("dark-mode-button");
    fireEvent.click(darkModeButton);

    expect(mockToggleColorMode).toHaveBeenCalled();
  });

  test("changes currency when a new currency is selected", () => {
    renderWithProviders();

    const currencySelector = screen.getByTestId("currency-selector");
    fireEvent.change(currencySelector, { target: { value: "EUR" } });

    expect(mockSetCurrency).toHaveBeenCalledWith("EUR");
  });

  test("renders nothing when authContext is null", () => {
    const mockColorModeContext = {
      mode: "light" as PaletteMode,
      toggleColorMode: mockToggleColorMode,
      setMode: jest.fn(),
    };

    const mockCurrencyContext = {
      currency: "USD" as Currency,
      setCurrency: mockSetCurrency,
    };

    render(
      <BrowserRouter>
        {/* Provide null as the AuthContext value */}
        <AuthContext.Provider value={null}>
          <ColorModeContext.Provider value={mockColorModeContext}>
            <CurrencyContext.Provider value={mockCurrencyContext}>
              <ThemeProvider theme={theme}>
                <Header />
              </ThemeProvider>
            </CurrencyContext.Provider>
          </ColorModeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Expect that nothing is rendered
    expect(screen.queryByTestId("home-button")).not.toBeInTheDocument();
    expect(screen.queryByText("CREA")).not.toBeInTheDocument();
  });
});

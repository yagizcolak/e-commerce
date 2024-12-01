// src/components/layouts/Footer/__tests__/Footer.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

describe("Footer Component", () => {
  const renderWithTheme = (themeMode: "light" | "dark") => {
    const theme = createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: "#1976d2",
        },
        background: {
          paper: "#ffffff",
        },
        text: {
          primary: "#000000",
        },
        common: {
          white: "#ffffff",
        },
      },
    });

    return render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );
  };

  test("renders the footer with default message", () => {
    renderWithTheme("light");
    expect(
      screen.getByText(/© \d{4} all rights reserved./i)
    ).toBeInTheDocument();
  });

  test("applies light mode styles correctly", () => {
    renderWithTheme("light");

    // Find the footer element using the test ID
    const footerElement = screen.getByTestId("footer");

    expect(footerElement).toHaveStyle("background-color: #1976d2");
    expect(footerElement).toHaveStyle("color: #ffffff");
  });

  test("applies dark mode styles correctly", () => {
    renderWithTheme("dark");

    // Find the footer element using the test ID
    const footerElement = screen.getByTestId("footer");

    expect(footerElement).toHaveStyle("background-color: #ffffff");
    expect(footerElement).toHaveStyle("color: #000000");
  });
});

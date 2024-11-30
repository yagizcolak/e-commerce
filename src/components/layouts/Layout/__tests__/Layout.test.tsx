// src/components/layouts/Layout/__tests__/Layout.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock Header and Footer to simplify tests
jest.mock("../../Header/Header", () => () => (
  <div data-testid="header">Header Component</div>
));
jest.mock("../../Footer/Footer", () => () => (
  <div data-testid="footer">Footer Component</div>
));

describe("Layout Component", () => {
  const renderWithTheme = (children: React.ReactNode) => {
    const theme = createTheme({
      palette: {
        mode: "light",
      },
    });

    return render(
      <ThemeProvider theme={theme}>
        <Layout>{children}</Layout>
      </ThemeProvider>
    );
  };

  test("renders Header, Footer, and children correctly", () => {
    renderWithTheme(<div data-testid="child">Main Content</div>);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });
});

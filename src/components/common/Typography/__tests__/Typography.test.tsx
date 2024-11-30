// src/components/common/Typography/__tests__/Typography.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from "../Typography";

describe("Typography Component", () => {
  test("renders children correctly", () => {
    render(<Typography>Test Text</Typography>);
    expect(screen.getByText("Test Text")).toBeInTheDocument();
  });

  test("applies the correct variant", () => {
    render(<Typography variant="h4">Header</Typography>);
    const element = screen.getByText("Header");
    expect(element).toHaveClass("MuiTypography-h4");
  });

  test("renders as the specified HTML element", () => {
    render(<Typography component="span">Span Text</Typography>);
    const element = screen.getByText("Span Text");
    expect(element.tagName).toBe("SPAN");
  });

  test("renders with color prop", () => {
    render(<Typography color="primary">Primary Text</Typography>);
    const element = screen.getByText("Primary Text");
    expect(element).toBeInTheDocument();
  });
});

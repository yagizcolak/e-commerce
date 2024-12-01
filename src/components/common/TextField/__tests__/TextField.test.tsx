import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextField from "../TextField";

describe("TextField Component", () => {
  test("renders TextField component with label", () => {
    render(<TextField label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("renders TextField with default value", () => {
    render(<TextField label="Email" defaultValue="test@example.com" />);
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
  });

  test("calls onChange handler when input changes", () => {
    const handleChange = jest.fn();
    render(<TextField label="Password" onChange={handleChange} />);
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "newpassword" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("newpassword");
  });

  test("renders as disabled when disabled prop is true", () => {
    render(<TextField label="Disabled Field" disabled />);
    const input = screen.getByLabelText("Disabled Field") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  test("renders with error state", () => {
    render(<TextField label="Error Field" error helperText="Invalid input" />);
    const input = screen.getByLabelText("Error Field");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Invalid input")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  test("renders Button component", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("disables the button when disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeDisabled();
  });

  test("renders with an icon", () => {
    const Icon = () => <svg data-testid="icon" />;
    render(<Button icon={<Icon />}>With Icon</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  test("applies additional className", () => {
    render(<Button className="extra-class">Styled Button</Button>);
    const button = screen.getByText("Styled Button");
    expect(button).toHaveClass("customButton");
    expect(button).toHaveClass("extra-class");
  });

  test("supports different variants", () => {
    render(<Button variant="contained">Contained Button</Button>);
    const button = screen.getByText("Contained Button");
    expect(button).toHaveClass("MuiButton-contained");
  });
});

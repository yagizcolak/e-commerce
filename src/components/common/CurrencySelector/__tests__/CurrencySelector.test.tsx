/* eslint-disable @typescript-eslint/no-empty-function */
// src/components/common/CurrencySelector/__tests__/CurrencySelector.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CurrencySelector from "../CurrencySelector";

describe("CurrencySelector Component", () => {
  const currencies = [
    { value: "USD", label: "$ USD" },
    { value: "EUR", label: "€ EUR" },
    { value: "TRY", label: "₺ TRY" },
  ];

  test("renders CurrencySelector component", () => {
    render(<CurrencySelector value="USD" onChange={() => {}} />);
    expect(screen.getByDisplayValue("$ USD")).toBeInTheDocument();
  });

  test("renders all currency options", () => {
    render(<CurrencySelector value="USD" onChange={() => {}} />);
    currencies.forEach((currency) => {
      expect(screen.getByText(currency.label)).toBeInTheDocument();
    });
  });

  test("calls onChange handler when selection changes", () => {
    const onChangeMock = jest.fn();
    render(<CurrencySelector value="USD" onChange={onChangeMock} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "EUR" },
    });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test("displays the correct initial value", () => {
    render(<CurrencySelector value="EUR" onChange={() => {}} />);
    expect(screen.getByDisplayValue("€ EUR")).toBeInTheDocument();
  });

  test("handles unsupported value gracefully", () => {
    render(<CurrencySelector value="GBP" onChange={() => {}} />);
    expect(screen.queryByDisplayValue("GBP")).not.toBeInTheDocument();
  });

  test("renders with default props", () => {
    render(<CurrencySelector value="USD" onChange={() => {}} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeEnabled();
  });

});

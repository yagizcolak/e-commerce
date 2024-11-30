// src/components/common/NoData/__tests__/NoData.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import NoData from "../NoData";

describe("NoData Component", () => {
  test("renders default message when no message prop is provided", () => {
    render(<NoData />);
    expect(screen.getByText("No data available.")).toBeInTheDocument();
  });

  test("renders custom message when message prop is provided", () => {
    const customMessage = "No records found.";
    render(<NoData message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});

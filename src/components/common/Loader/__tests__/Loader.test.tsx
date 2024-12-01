import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader Component", () => {
  test("renders Loader component", () => {
    render(<Loader />);
    const loaderElement = screen.getByRole("progressbar");
    expect(loaderElement).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import PrivateRoute from "../PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

jest.mock("../../../hooks/useAuth");

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

const MockProtected = () => (
  <div data-testid="protected">Protected Content</div>
);
const MockLogin = () => <div data-testid="login">Login Page</div>;

describe("PrivateRoute Component", () => {
  const renderWithRouter = (token: string | null) => {
    (useAuth as jest.Mock).mockReturnValue({ token });

    return render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <MockProtected />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<MockLogin />} />
        </Routes>
      </BrowserRouter>
    );
  };

  test("renders children when token is present", () => {
    window.history.pushState({}, "Protected Page", "/protected");
    renderWithRouter("valid-token");

    expect(screen.getByTestId("protected")).toBeInTheDocument();
  });

  test("redirects to login when token is absent", () => {
    window.history.pushState({}, "Protected Page", "/protected");
    renderWithRouter(null);

    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
});

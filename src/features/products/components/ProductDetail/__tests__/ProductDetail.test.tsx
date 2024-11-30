/* eslint-disable @typescript-eslint/no-empty-function */
// src/features/products/components/ProductDetail/__tests__/ProductDetail.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import { BrowserRouter } from "react-router-dom";
import { CurrencyContext } from "../../../../../context/CurrencyContext";
import {
  NotificationProvider,
  NotificationSeverity,
} from "../../../../../context/NotificationContext";
import { fetchProductById } from "../../../services/productService";

// Mock jose
jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

// Mock fetchProductById
jest.mock("../../../services/productService");
const mockedFetchProductById = fetchProductById as jest.Mock;

const mockNavigate = jest.fn();
// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  useNavigate: () => mockNavigate,
}));

// Mock useNotification
const mockShowNotification = jest.fn();
jest.mock("../../../../../context/NotificationContext", () => {
  const originalModule = jest.requireActual(
    "../../../../../context/NotificationContext"
  );
  return {
    ...originalModule,
    useNotification: () => ({
      showNotification: mockShowNotification,
    }),
    NotificationSeverity: originalModule.NotificationSeverity,
  };
});

describe("ProductDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders product details and tabs without crashing", async () => {
    mockedFetchProductById.mockResolvedValueOnce({
      id: 1,
      name: "Test Product",
      price: 100,
      images: ["image1.jpg"],
      rating: 4.5,
      arrivalDate: "2021-09-01T00:00:00Z",
      description: "This is a test product.",
      comments: [],
    });

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductDetail />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    await screen.findByText("Test Product");

    // Check if the tabs are rendered
    expect(screen.getByRole("tablist")).toBeInTheDocument();

    // Check if the "DETAILS" tab is rendered
    expect(screen.getByText("DETAILS")).toBeInTheDocument();

    // Check if the "COMMENTS" tab is rendered
    expect(screen.getByText("COMMENTS (0)")).toBeInTheDocument();
  });

  test("displays Loader when loading is true", async () => {
    // Mock a delay in fetchProductById to simulate loading
    mockedFetchProductById.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(null), 100))
    );

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductDetail />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays NoData when product is not found", async () => {
    mockedFetchProductById.mockResolvedValueOnce(null);

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductDetail />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    await screen.findByText("Product not found.");
  });

  test("calls showNotification when fetching product fails", async () => {
    const errorMessage = "Failed to fetch product.";
    mockedFetchProductById.mockRejectedValueOnce(new Error(errorMessage));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductDetail />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(mockShowNotification).toHaveBeenCalledWith({
        message: errorMessage,
        severity: NotificationSeverity.Error,
      })
    );

    consoleErrorSpy.mockRestore();
  });

  test("changes tabs when tab is clicked", async () => {
    mockedFetchProductById.mockResolvedValueOnce({
      id: 1,
      name: "Test Product",
      price: 100,
      images: ["image1.jpg"],
      rating: 4.5,
      arrivalDate: "2021-09-01T00:00:00Z",
      description: "This is a test product.",
      comments: [
        {
          id: 1,
          content: "Great product!",
          username: "User1",
          rating: 5,
          date: "2021-09-01T00:00:00Z",
        },
      ],
    });

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductDetail />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    await screen.findByText("This is a test product.");

    // Click on the COMMENTS tab
    const commentsTab = screen.getByRole("tab", { name: /COMMENTS \(1\)/i });
    fireEvent.click(commentsTab);

    // Now, the COMMENTS tab content should be displayed
    await screen.findByText("Great product!");
    expect(screen.getByText("Great product!")).toBeInTheDocument();
  });
});

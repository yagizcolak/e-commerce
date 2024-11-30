/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
// src/features/products/components/ProductList/__tests__/ProductList.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../ProductList";
import { BrowserRouter } from "react-router-dom";
import { CurrencyContext } from "../../../../../context/CurrencyContext";
import {
  NotificationProvider,
  NotificationSeverity,
} from "../../../../../context/NotificationContext";

// Mock jose
jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600,
  })),
}));

const mockNavigate = jest.fn();

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
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

// Mock useProducts
jest.mock("../../../hooks/useProducts", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    products: [
      {
        id: 1,
        name: "Product 1",
        price: 50,
        images: ["image1.jpg"],
        rating: 4.0,
      },
      {
        id: 2,
        name: "Product 2",
        price: 75,
        images: ["image2.jpg"],
        rating: 4.5,
      },
      {
        id: 3,
        name: "Product 3",
        price: 50,
        images: ["image3.jpg"],
        rating: 4.0,
      },
      {
        id: 4,
        name: "Product 4",
        price: 75,
        images: ["image4.jpg"],
        rating: 4.5,
      },
      {
        id: 5,
        name: "Product 5",
        price: 50,
        images: ["image5.jpg"],
        rating: 4.0,
      },
    ],
    loading: false,
  })),
}));

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders product cards without crashing", () => {
    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("navigates to product detail when 'View Details' button is clicked", () => {
    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: /view details/i })[0]
    );

    expect(mockNavigate).toHaveBeenCalledWith("/products/1");
  });

  test("displays Loader when loading is true", () => {
    const useProductsMock = require("../../../hooks/useProducts").default;
    useProductsMock.mockReturnValueOnce({
      products: [],
      loading: true,
    });

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays NoData when products array is empty", () => {
    const useProductsMock = require("../../../hooks/useProducts").default;
    useProductsMock.mockReturnValueOnce({
      products: [],
      loading: false,
    });

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("No products available.")).toBeInTheDocument();
  });

  test("removes 'selectedProductId' from sessionStorage on mount", () => {
    const removeItemSpy = jest.spyOn(
      window.sessionStorage.__proto__,
      "removeItem"
    );

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    expect(removeItemSpy).toHaveBeenCalledWith("selectedProductId");
    removeItemSpy.mockRestore();
  });

  test("changes page when pagination is clicked", () => {
    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    const paginationButtons = screen.getAllByRole("button");

    const page2 = paginationButtons.find(
      (button) => button.textContent === "2"
    );
    expect(page2).toBeInTheDocument();
    fireEvent.click(page2!);
    expect(page2).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("Product 5")).toBeInTheDocument();
  });

  test("calls showNotification when fetching products fails", () => {
    const useProductsMock = require("../../../hooks/useProducts").default;
    useProductsMock.mockImplementationOnce(
      ({
        showNotification,
      }: {
        showNotification: (message: string, severity: NotificationSeverity) => void;
      }) => {
        showNotification("Failed to fetch products.", NotificationSeverity.Error);
        return { products: [], loading: false };
      }
    );

    render(
      <BrowserRouter>
        <CurrencyContext.Provider
          value={{ currency: "USD", setCurrency: jest.fn() }}
        >
          <NotificationProvider>
            <ProductList />
          </NotificationProvider>
        </CurrencyContext.Provider>
      </BrowserRouter>
    );

    expect(mockShowNotification).toHaveBeenCalledWith({
      message: "Failed to fetch products.",
      severity: NotificationSeverity.Error,
    });
  });
});
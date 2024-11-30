// src/features/products/components/ProductCard/__tests__/ProductCard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { Product } from "../../../../../types/Product";

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 100,
    images: ["image1.jpg", "image2.jpg"],
    rating: 4.5,
    description: "",
    arrivalDate: "",
    comments: [],
  };

  const mockOnViewDetails = jest.fn();

  test("renders without crashing", () => {
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={mockOnViewDetails}
        currency="USD"
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("displays product name", () => {
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={mockOnViewDetails}
        currency="USD"
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("displays product price", () => {
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={mockOnViewDetails}
        currency="USD"
      />
    );
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  test('calls onViewDetails when "View Details" button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={mockOnViewDetails}
        currency="USD"
      />
    );
    const button = screen.getByRole("button", { name: /view details/i });
    fireEvent.click(button);
    expect(mockOnViewDetails).toHaveBeenCalledWith(1);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetailsTab from "../ProductDetailsTab";
import { Product } from "../../../../../types/Product";

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("ProductDetailsTab", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 100,
    images: ["image1.jpg"],
    rating: 4.5,
    arrivalDate: "2021-09-01T00:00:00Z",
    description: "This is a test product.",
    comments: [],
  };

  test("renders product details correctly", () => {
    render(
      <ProductDetailsTab
        product={mockProduct}
        commentsCount={5}
        currency="USD"
      />
    );

    // Check if product name is displayed
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Check if price is displayed
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    // Check if rating is displayed
    expect(screen.getByText("4.5")).toBeInTheDocument();

    // Check if arrival date is displayed
    expect(screen.getByText("09/01/2021")).toBeInTheDocument();

    // Check if total comments are displayed
    expect(screen.getByText("5")).toBeInTheDocument();

    // Check if description is displayed
    expect(screen.getByText("This is a test product.")).toBeInTheDocument();
  });
});

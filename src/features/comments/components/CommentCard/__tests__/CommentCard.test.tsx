// src/features/comments/components/CommentCard/__tests__/CommentCard.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import CommentCard from "../CommentCard";

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("CommentCard", () => {
  const mockComment = {
    id: 1,
    username: "testuser",
    date: "2021-09-01T12:00:00Z",
    rating: 4.5,
    content: "This is a test comment.",
  };

  test("renders without crashing", () => {
    render(<CommentCard comment={mockComment} />);
  });

  test("displays the username", () => {
    render(<CommentCard comment={mockComment} />);
    expect(screen.getByTestId("comment-username")).toHaveTextContent(
      "testuser"
    );
  });

  test("displays the formatted date", () => {
    render(<CommentCard comment={mockComment} />);
    expect(screen.getByTestId("comment-date")).toHaveTextContent("9/1/2021");
  });

  test("displays the rating", () => {
    render(<CommentCard comment={mockComment} />);
    expect(screen.getByTestId("comment-rating")).toBeInTheDocument();
  });

  test("displays the comment content", () => {
    render(<CommentCard comment={mockComment} />);
    expect(screen.getByTestId("comment-content")).toHaveTextContent(
      "This is a test comment."
    );
  });
});

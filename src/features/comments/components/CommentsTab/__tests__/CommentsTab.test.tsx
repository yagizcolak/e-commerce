import React from "react";
import { render, screen } from "@testing-library/react";
import CommentsTab from "../CommentsTab";

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("CommentsTab", () => {
  const mockOnAddComment = jest.fn();

  test("renders without crashing", () => {
    render(<CommentsTab comments={[]} onAddComment={mockOnAddComment} />);
  });

  test('displays "No comments yet" message when there are no comments', () => {
    render(<CommentsTab comments={[]} onAddComment={mockOnAddComment} />);
    expect(screen.getByTestId("no-comments-message")).toHaveTextContent(
      "No comments yet. Be the first to comment!"
    );
  });

  test("renders comments when comments are provided", () => {
    const mockComments = [
      {
        id: 1,
        username: "user1",
        date: "2021-09-01T12:00:00Z",
        rating: 4.5,
        content: "First comment",
      },
      {
        id: 2,
        username: "user2",
        date: "2021-09-02T12:00:00Z",
        rating: 5,
        content: "Second comment",
      },
    ];
    render(
      <CommentsTab comments={mockComments} onAddComment={mockOnAddComment} />
    );
    expect(screen.getByTestId("comments-container")).toBeInTheDocument();
    expect(screen.getAllByTestId("comment-username")).toHaveLength(2);
  });

  test("renders CommentForm component", () => {
    render(<CommentsTab comments={[]} onAddComment={mockOnAddComment} />);
    expect(screen.getByTestId("comment-form")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentForm from "../CommentForm";

jest.mock("jose", () => ({
  decodeJwt: jest.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  })),
}));

describe("CommentForm", () => {
  test("renders the form correctly", () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    expect(screen.getByText("Add a Comment")).toBeInTheDocument();
    expect(screen.getByTestId("rating-input")).toBeInTheDocument();
    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("submits the form with valid inputs", async () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    fireEvent.click(screen.getByLabelText("4 Stars"));

    const contentInput = screen.getByLabelText("Comment");
    fireEvent.change(contentInput, { target: { value: "Test comment" } });

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddCommentMock).toHaveBeenCalledWith("Test comment", 4);
    });
  });

  test("does not submit the form when inputs are invalid", () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);

    expect(onAddCommentMock).not.toHaveBeenCalled();
  });

  test("shows validation errors when inputs are invalid", async () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    const ratingInput = screen.getByTestId("rating-input");
    fireEvent.blur(ratingInput);

    const contentInput = screen.getByLabelText("Comment");
    fireEvent.blur(contentInput);

    await waitFor(() => {
      expect(screen.getByText("Comment is required")).toBeInTheDocument();
      expect(screen.getByText("Minimum rating is 1")).toBeInTheDocument();
    });
  });
});

// src/features/comments/components/CommentForm/__tests__/CommentForm.test.tsx

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

    // Check if all elements are rendered
    expect(screen.getByText("Add a Comment")).toBeInTheDocument();
    expect(screen.getByTestId("rating-input")).toBeInTheDocument();
    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("submits the form with valid inputs", async () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    // Simulate entering a rating by clicking on the star labeled '4 Stars'
    fireEvent.click(screen.getByLabelText("4 Stars"));

    // Simulate entering comment content
    const contentInput = screen.getByLabelText("Comment");
    fireEvent.change(contentInput, { target: { value: "Test comment" } });

    // Ensure the submit button is enabled
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).not.toBeDisabled();

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(onAddCommentMock).toHaveBeenCalledWith("Test comment", 4);
    });
  });

  test("does not submit the form when inputs are invalid", () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    // Attempt to submit without valid inputs
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);

    // Verify that onAddComment was not called
    expect(onAddCommentMock).not.toHaveBeenCalled();
  });

  test("shows validation errors when inputs are invalid", async () => {
    const onAddCommentMock = jest.fn();

    render(<CommentForm onAddComment={onAddCommentMock} />);

    // Simulate blur events on both inputs to trigger validation
    const ratingInput = screen.getByTestId("rating-input");
    fireEvent.blur(ratingInput);

    const contentInput = screen.getByLabelText("Comment");
    fireEvent.blur(contentInput);

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText("Comment is required")).toBeInTheDocument();
      expect(screen.getByText("Minimum rating is 1")).toBeInTheDocument();
    });
  });
});

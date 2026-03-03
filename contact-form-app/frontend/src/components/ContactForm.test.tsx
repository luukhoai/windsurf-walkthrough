import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

import { submitContactForm } from "../utils/api";

// Mock the API module
jest.mock("../utils/api", () => ({
  submitContactForm: jest.fn(),
}));

const mockSubmitContactForm = submitContactForm as jest.MockedFunction<
  typeof submitContactForm
>;

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("enables submit button when all fields are filled", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a valid message with enough characters.",
    );

    expect(submitButton).toBeEnabled();
  });

  it("submits form successfully with valid data", async () => {
    mockSubmitContactForm.mockResolvedValueOnce({
      success: true,
      data: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        message: "This is a valid message with enough characters.",
        attachment: null,
        created_at: "2023-01-01T00:00:00Z",
      },
    });

    render(<ContactForm />);

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a valid message with enough characters.",
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    expect(mockSubmitContactForm).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      message: "This is a valid message with enough characters.",
    });

    await waitFor(() => {
      expect(
        screen.getByText(/form submitted successfully/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    mockSubmitContactForm.mockResolvedValueOnce({
      success: false,
      error: "Network error",
    });

    render(<ContactForm />);

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a valid message with enough characters.",
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it("disables submit button while submitting", async () => {
    mockSubmitContactForm.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<ContactForm />);

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a valid message with enough characters.",
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    expect(
      screen.getByRole("button", { name: /submitting/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("clears form after successful submission", async () => {
    mockSubmitContactForm.mockResolvedValueOnce({
      success: true,
      data: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        message: "This is a valid message with enough characters.",
        attachment: null,
        created_at: "2023-01-01T00:00:00Z",
      },
    });

    render(<ContactForm />);

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a valid message with enough characters.",
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue("");
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue("");
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/message/i)).toHaveValue("");
    });
  });

  it("shows attachment field in form", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/attachment/i)).toBeInTheDocument();
    expect(screen.getByText(/allowed types/i)).toBeInTheDocument();
  });
});

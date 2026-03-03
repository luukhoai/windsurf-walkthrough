import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders contact form header", () => {
  render(<App />);
  const headerElement = screen.getByText(/contact form/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders contact form component", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();
});

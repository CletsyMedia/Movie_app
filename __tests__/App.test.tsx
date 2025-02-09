import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

test("renders the Movie App title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Movie | Flix/i);
  expect(titleElement).toBeInTheDocument();
});

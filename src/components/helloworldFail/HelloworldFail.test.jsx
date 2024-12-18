// src/components/HelloWorld.test.jsx
import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloworldFail";

test("renders greeting message with the provided name", () => {
  render(<HelloWorld name="John" />);
  const heading = screen.getByRole("heading", { name: /Hello, John 444!/i });
  expect(heading).toBeInTheDocument(); // Using jest-dom matcher
});

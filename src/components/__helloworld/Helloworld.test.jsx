// src/components/HelloWorld.test.jsx
import { render, screen } from "@testing-library/react";
import HelloWorld from "./Helloworld";

test("renders greeting message with the provided name", () => {
  render(<HelloWorld name="John" />);
  const heading = screen.getByRole("heading", { name: /Hello, John!/i });
  expect(heading).toBeInTheDocument(); // Using jest-dom matcher
});

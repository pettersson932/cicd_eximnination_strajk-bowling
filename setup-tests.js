import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/__mocks/server";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

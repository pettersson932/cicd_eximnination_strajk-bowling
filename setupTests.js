import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

afterAll(() => server.close());

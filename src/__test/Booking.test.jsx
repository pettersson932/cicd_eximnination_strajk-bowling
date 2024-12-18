import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Booking from "../views/Booking";
import { MemoryRouter } from "react-router-dom";

beforeAll(() => {
  global.sessionStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    clear: vi.fn(),
  };
});

let dateUserInput, timeUserInput, playersInput, lanesInput;

beforeEach(() => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  dateUserInput = screen.getByLabelText(/Date/i);
  timeUserInput = screen.getByLabelText(/Time/i);
  playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
  lanesInput = screen.queryByLabelText(/number of lanes/i);
});

describe("Booking", () => {
  it("user should be able to select a date & time", () => {
    fireEvent.change(dateUserInput, { target: { value: "2024-12-31" } });
    fireEvent.change(timeUserInput, { target: { value: "22:00" } });

    expect(dateUserInput.value).toBe("2024-12-31");
    expect(timeUserInput.value).toBe("22:00");
  });

  it("user should be able to select number of players", () => {
    fireEvent.change(playersInput, { target: { value: "2" } });
    expect(playersInput.value).toBe("2");
  });

  it("reserve lanes based on the number of players", () => {
    fireEvent.change(playersInput, { target: { value: "10" } });

    if (lanesInput) {
      fireEvent.change(lanesInput, { target: { value: "2" } });
      expect(lanesInput.value).toBe("2");
    }
    expect(playersInput.value).toBe("10");
  });
});

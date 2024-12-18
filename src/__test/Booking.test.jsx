import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookingInfo from "../components/BookingInfo/BookingInfo";
import Booking from "../views/Booking";
import { MemoryRouter } from "react-router-dom";

beforeAll(() => {
  global.sessionStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    clear: vi.fn(),
  };
});

describe("Booking", () => {
  it("user should be able to select a date & time from calendar & time-system.", () => {
    const updateBookingDetails = vi.fn();
    render(
      <MemoryRouter>
        <BookingInfo updateBookingDetails={updateBookingDetails} />
      </MemoryRouter>
    );
    const dateUserInput = screen.getByLabelText(/Date/i);
    const timeUserInput = screen.getByLabelText(/Time/i);

    fireEvent.change(dateUserInput, { target: { value: "2024-12-31" } });
    fireEvent.change(timeUserInput, { target: { value: "22:00" } });

    expect(dateUserInput.value).toBe("2024-12-31");
    expect(timeUserInput.value).toBe("22:00");
  });

  it("user should be able to select number of players.", () => {
    const updateBookingDetails = vi.fn();
    render(
      <MemoryRouter>
        <BookingInfo updateBookingDetails={updateBookingDetails} />
      </MemoryRouter>
    );
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: "2" } });
    expect(playersInput.value).toBe("2");
  });
});

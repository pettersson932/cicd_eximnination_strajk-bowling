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

describe("BookingInfo Component", () => {
  it("should allow the user to select a date", () => {
    const updateBookingDetails = vi.fn();
    render(
      <MemoryRouter>
        <BookingInfo updateBookingDetails={updateBookingDetails} />
      </MemoryRouter>
    );
    const dateInput = screen.getByLabelText(/Date/i);
    fireEvent.change(dateInput, { target: { value: "2024-12-20" } });
    expect(dateInput.value).toBe("2024-12-20");
  });

  it("should allow the user to select a time", () => {
    const updateBookingDetails = vi.fn();
    render(
      <MemoryRouter>
        <BookingInfo updateBookingDetails={updateBookingDetails} />
      </MemoryRouter>
    );
    const timeInput = screen.getByLabelText(/Time/i);
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    expect(timeInput.value).toBe("15:00");
  });

  it("should allow the user to enter the number of players", () => {
    const updateBookingDetails = vi.fn();
    render(
      <MemoryRouter>
        <BookingInfo updateBookingDetails={updateBookingDetails} />
      </MemoryRouter>
    );
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: "3" } });
    expect(playersInput.value).toBe("3");
  });
});

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

  it("user should be able to reserve lanes", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const bookingButton = screen.getByRole("button", {
      name: /striiiiiike!/i,
    });
    expect(bookingButton).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: "5" },
    });

    const shoeButton = screen.getByText("+");
    fireEvent.click(shoeButton);
    fireEvent.click(shoeButton);
    fireEvent.click(shoeButton);
    fireEvent.click(shoeButton);
    fireEvent.click(shoeButton);

    expect(screen.getAllByText(/Shoe size \/ person/i).length).toBe(5);

    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/i);
    shoeInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: 44 + index * 2 } });
    });

    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: "1" },
    });

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2024-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "22:00" },
    });

    fireEvent.click(bookingButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /det får max vara 4 spelare per bana/i
      );
      expect(errorMessage).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(global.sessionStorage.setItem).not.toHaveBeenCalled();
    });
  });
});

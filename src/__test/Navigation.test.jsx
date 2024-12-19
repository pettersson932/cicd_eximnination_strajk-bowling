import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Booking from "../views/Booking";
import Navigation from "../components/Navigation/Navigation";
import Confirmation from "../views/Confirmation";

beforeEach(() => {
  sessionStorage.clear();
});

describe("Navigation", async () => {
  it("user should get redirected to confirmView when booking is fin", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Booking />
        <Confirmation />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: "1" },
    });

    const shoeButton = screen.getByText("+");
    fireEvent.click(shoeButton);

    expect(screen.getAllByText(/Shoe size \/ person/i).length).toBe(1);

    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/i);
    fireEvent.change(shoeInputs[0], { target: { value: "99" } });

    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2024-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "23:00" },
    });

    const bookingButton = screen.getByRole("button", { name: /striiiiiike!/i });
    fireEvent.click(bookingButton);

    await waitFor(() => {
      expect(screen.getByText(/See you soon!/i)).toBeInTheDocument();
    });
  });

  it("user should get errorMsg when navigate to confirmView w/o any booking in sessionStorage", async () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
  });

  it("user should be able to see its booking when navigate to confirmView", () => {
    sessionStorage.setItem(
      "confirmation",
      JSON.stringify({
        when: "2024-12-31T23:00",
        people: 1,
        lanes: 1,
        price: 220,
        id: "12345",
      })
    );

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("See you soon!")).toBeInTheDocument();
    expect(screen.getByLabelText("When").value).toBe("2024-12-31 23:00");
    expect(screen.getByLabelText("Who").value).toBe("1");
    expect(screen.getByLabelText("Lanes").value).toBe("1");
  });
});

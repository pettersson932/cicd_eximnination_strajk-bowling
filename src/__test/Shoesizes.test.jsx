import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "../views/Booking";
import { describe, beforeEach, it, expect } from "vitest";

describe("Shoe Sizes", () => {
  let addPlayer;
  let changeShoeSize;
  let shoeButton;
  let bookingButton;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    addPlayer = () => {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);
    };

    changeShoeSize = (input, size) => {
      fireEvent.change(input, { target: { value: size } });
    };

    shoeButton = screen.getByText("+");
    bookingButton = screen.getByRole("button", { name: /striiiiiike!/i });
  });

  const getShoeSizeInput = () => screen.getByLabelText(/shoe size/i);
  const getShoeSizeInputs = () => screen.getAllByLabelText(/shoe size/i);

  it("user should be able to select shoesize for each player", () => {
    addPlayer();

    const shoeSizeInput = getShoeSizeInput();
    changeShoeSize(shoeSizeInput, "99");

    expect(shoeSizeInput.value).toBe("99");
  });

  it("user should be able to change shoesize for each player", () => {
    addPlayer();

    const shoeSizeInput = getShoeSizeInput();
    changeShoeSize(shoeSizeInput, "99");
    changeShoeSize(shoeSizeInput, "96");

    expect(shoeSizeInput.value).toBe("96");
  });

  it("user should be able to change shoesizes for all players in the booking", () => {
    addPlayer();
    addPlayer();

    const shoeSizeInputs = getShoeSizeInputs();
    changeShoeSize(shoeSizeInputs[0], "98");
    changeShoeSize(shoeSizeInputs[1], "99");

    expect(shoeSizeInputs[0].value).toBe("98");
    expect(shoeSizeInputs[1].value).toBe("99");
  });

  it("user should get an overview of the booking w player and shoesizes before confirming", async () => {
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: "3" },
    });

    for (let i = 0; i < 3; i++) addPlayer();

    const shoeSizeInputs = getShoeSizeInputs();
    changeShoeSize(shoeSizeInputs[0], "91");
    changeShoeSize(shoeSizeInputs[1], "92");
    changeShoeSize(shoeSizeInputs[2], "93");

    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2024-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "23:00" },
    });

    fireEvent.click(bookingButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Shoe size \/ person/i)).toHaveLength(3);
    });
  });

  it("user should be able to remove a field for shoes", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    const addShoeButton = screen.getAllByText("+")[0];
    fireEvent.click(addShoeButton);
    fireEvent.click(addShoeButton);

    let shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
    expect(shoeSizeInputs.length).toBe(2);

    const removeShoeButton = screen.getAllByText("-")[0];
    fireEvent.click(removeShoeButton);

    shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
    expect(shoeSizeInputs.length).toBe(1);
  });
});

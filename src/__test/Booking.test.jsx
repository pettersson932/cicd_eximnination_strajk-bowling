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

  it("user should be able to reserve lanes", () => {
    fireEvent.change(playersInput, { target: { value: "4" } });

    if (lanesInput) {
      fireEvent.change(lanesInput, { target: { value: "1" } });
      expect(lanesInput.value).toBe("1");
    }
    expect(playersInput.value).toBe("4");
  });

  it("user should see errorMsg if too many players per lane in the booking", () => {
    fireEvent.change(dateUserInput, { target: { value: "2024-12-31" } });
    fireEvent.change(timeUserInput, { target: { value: "23:00" } });

    expect(dateUserInput.value).toBe("2024-12-31");
    expect(timeUserInput.value).toBe("23:00");

    const addShoeButton = screen.getByText("+");
    fireEvent.click(addShoeButton);
    fireEvent.click(addShoeButton);
    fireEvent.click(addShoeButton);
    fireEvent.click(addShoeButton);
    fireEvent.click(addShoeButton);

    const shoeSizeInputs = screen.getAllByLabelText(/shoe size/i);
    const shoeSizes = ["99", "99", "99", "99", "99"];

    shoeSizes.forEach((size, index) => {
      fireEvent.change(shoeSizeInputs[index], { target: { value: size } });
      expect(shoeSizeInputs[index].value).toBe(size);
    });

    fireEvent.change(playersInput, { target: { value: "5" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    const submitButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /det får max vara 4 spelare per bana/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

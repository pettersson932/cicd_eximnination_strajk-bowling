import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("Confirmation", () => {
  it("user should get bookingNumber & totalPrice after making res", async () => {
    render(<App />);

    const dateInput = screen.getByLabelText("Date");
    const timeInput = screen.getByLabelText("Time");
    const peopleInput = screen.getByLabelText("Number of awesome bowlers");
    const lanesInput = screen.getByLabelText("Number of lanes");
    const addShoeButton = screen.getByText("+");
    const bookButton = screen.getByText("strIIIIIike!");

    fireEvent.change(dateInput, { target: { value: "2023-10-10" } });
    fireEvent.change(timeInput, { target: { value: "18:00" } });
    fireEvent.change(peopleInput, { target: { value: "4" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    for (let i = 0; i < 4; i++) {
      fireEvent.click(addShoeButton);
    }
    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    shoeInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "42" } });
    });

    await waitFor(() => {
      fireEvent.click(bookButton);
    });

    const price = JSON.parse(sessionStorage.getItem("confirmation")).price;

    await waitFor(() => {
      expect(screen.getByText("See you soon!")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText("When").value).toBe("2023-10-10 18:00");
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Who").value).toBe("4");
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Lanes").value).toBe("1");
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Booking number").value).toBe("12345");
    });
    await waitFor(() => {
      expect(screen.findByText(`${price} SEK`)).toBeDefined();
    });
  });
});

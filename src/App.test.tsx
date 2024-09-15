import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("./components/Dashboard/Dashboard", () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard">Dashboard Component</div>,
}));

jest.mock("./components/FlightDetails/FlightDetails", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="flight-details">FlightDetails Component</div>
  ),
}));

describe("App Component", () => {
  it("renders Dashboard component for the root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("dashboard")).toBeInTheDocument();
  });

  it("renders FlightDetails component for the /flight-details/:id route", () => {
    render(
      <MemoryRouter initialEntries={["/flight-details/123"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("flight-details")).toBeInTheDocument();
  });
});

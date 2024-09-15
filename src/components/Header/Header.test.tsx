import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Header Component", () => {
  it("should render Header component with correct elements", () => {
    render(<Header title="Flight Radar" imagePath="logo_white.png" />);

    expect(screen.getByTestId("logo")).toHaveAttribute("src", "logo_white.png");
    expect(screen.getByTestId("title")).toHaveTextContent("Flight Radar");
  });

  it("should navigate back to dashboard when flight icon is clicked", () => {
    render(<Header title="Flight Radar" imagePath="logo_white.png" />);

    const flightIcon = screen.getByTestId("logo");
    fireEvent.click(flightIcon);

    expect(mockNavigate).toHaveBeenCalledWith(`/`);
  });
});

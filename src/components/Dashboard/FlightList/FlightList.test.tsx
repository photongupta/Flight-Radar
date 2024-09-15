import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FlightList from "./FlightList";
import useFlights from "../../../../src/hooks/useFlights";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../../src/hooks/useFlights", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockErrorDetails = jest.fn();

jest.mock("../../ErrorDetails/ErrorDetails", () => ({
  __esModule: true,
  default: (props: any) => {
    mockErrorDetails(props);
    return <div>{props.description}</div>;
  },
}));

describe("FlightList Component", () => {
  const flightsMock = [
    {
      id: 1,
      airline: "Airline A",
      flightNumber: "AA123",
      origin: "City A",
      destination: "City B",
      departureTime: "2024-09-15T22:08:23.581Z",
      status: "On Time",
    },
    {
      id: 2,
      airline: "Airline B",
      flightNumber: "BB123",
      origin: "City C",
      destination: "City D",
      departureTime: "2024-10-15T22:08:23.581Z",
      status: "Delayed",
    },
  ];

  it("should render flight information headers", async () => {
    (useFlights as jest.Mock).mockReturnValue({
      flights: flightsMock,
      fetchFlightsError: { isError: false, description: "" },
      isLoading: false,
    });

    render(<FlightList />);

    expect(screen.getByText("Air line")).toBeInTheDocument();
    expect(screen.getByText("Flight Number")).toBeInTheDocument();
    expect(screen.getByText("Origin")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(screen.getByText("Departure Time")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("should render flight details of each flights when it is present", async () => {
    (useFlights as jest.Mock).mockReturnValue({
      flights: flightsMock,
      fetchFlightsError: { isError: false, description: "" },
      isLoading: false,
    });

    render(<FlightList />);

    expect(screen.getByText("Airline A")).toBeInTheDocument();
    expect(screen.getByText("AA123")).toBeInTheDocument();
    expect(screen.getByText("City A")).toBeInTheDocument();
    expect(screen.getByText("City B")).toBeInTheDocument();
    expect(screen.getByText("On Time")).toBeInTheDocument();

    expect(screen.getByText("Airline B")).toBeInTheDocument();
    expect(screen.getByText("BB123")).toBeInTheDocument();
    expect(screen.getByText("City C")).toBeInTheDocument();
    expect(screen.getByText("City D")).toBeInTheDocument();
    expect(screen.getByText("Delayed")).toBeInTheDocument();
  });

  it("should show fetching message when flights are being fetched", () => {
    (useFlights as jest.Mock).mockReturnValue({
      flights: [],
      fetchFlightsError: { isError: false, description: "" },
      isLoading: true,
    });

    render(<FlightList />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should render error details when there is a fetch error", async () => {
    (useFlights as jest.Mock).mockReturnValue({
      flights: [],
      fetchFlightsError: { isError: true, description: "" },
      isLoading: false,
    });

    render(<FlightList />);

    expect(mockErrorDetails).toHaveBeenCalledWith({
      description: "Could not load flights information.",
      showTryAgain: true,
      "data-testid": "error-details",
    });
  });

  it("should navigate back to flight details page when status button is clicked", () => {
    (useFlights as jest.Mock).mockReturnValue({
      flights: flightsMock,
      fetchFlightsError: { isError: false, description: "" },
      isLoading: false,
    });

    render(<FlightList />);

    const button = screen.getByTestId("button-1");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("flight-details/1");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FlightDetails from "./FlightDetails";
import useFlightDetails from "../../hooks/useFlightDetails";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useFlightDetails", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockHeader = jest.fn();

jest.mock("../Header/Header", () => ({
  __esModule: true,
  default: (props: any) => {
    mockHeader(props);
    return <div>{props.description}</div>;
  },
}));

const mockErrorDetails = jest.fn();

jest.mock("../ErrorDetails/ErrorDetails", () => ({
  __esModule: true,
  default: (props: any) => {
    mockErrorDetails(props);
    return <div>{props.description}</div>;
  },
}));

describe("FlightDetails Component", () => {
  const mockFetchFlightDetails = jest.fn();

  beforeEach(() => {
    (useFlightDetails as jest.Mock).mockReturnValue({
      fetchFlightDetails: mockFetchFlightDetails,
      flightDetails: {
        airline: "AirlineName",
        flightNumber: "1234",
        origin: "JFK",
        destination: "LAX",
        status: "On Time",
        departureTime: "2024-09-16T15:00:00Z",
      },
      isLoading: false,
      fetchFlightDetailsError: { isError: false },
    });
  });

  it("should render header and flight details when data is loaded", async () => {
    render(
      <Router>
        <FlightDetails />
      </Router>,
    );

    expect(screen.getByTestId("flight-tile")).toBeInTheDocument();
    expect(screen.getByTestId("airline")).toHaveTextContent("AirlineName");
    expect(screen.getByTestId("flight-number")).toHaveTextContent("1234");
    expect(screen.getByTestId("origin")).toHaveTextContent("JFK");
    expect(screen.getByTestId("destination")).toHaveTextContent("LAX");
    expect(screen.getByTestId("departure-time")).toHaveTextContent(
      "Departure Time: 2024-Sep-16 11:00",
    );

    expect(mockHeader).toHaveBeenCalledWith({
      imagePath: "../logo_white.png",
      title: "AirlineName - 1234",
    });
  });

  it("shoudld display loader while loading", () => {
    (useFlightDetails as jest.Mock).mockReturnValue({
      fetchFlightDetails: mockFetchFlightDetails,
      flightDetails: {
        airline: "",
        flightNumber: "",
        origin: "",
        destination: "",
        status: "",
        departureTime: "",
      },
      isLoading: true,
      fetchFlightDetailsError: { isError: false },
    });

    render(
      <Router>
        <FlightDetails />
      </Router>,
    );

    expect(screen.getByTestId("loader")).toHaveTextContent(
      "Loading Flight Details...",
    );
  });

  it("should display error message when there is an error", () => {
    (useFlightDetails as jest.Mock).mockReturnValue({
      fetchFlightDetails: mockFetchFlightDetails,
      flightDetails: {
        airline: "",
        flightNumber: "",
        origin: "",
        destination: "",
        status: "",
        departureTime: "",
      },
      isLoading: false,
      fetchFlightDetailsError: { isError: true },
    });

    render(
      <Router>
        <FlightDetails />
      </Router>,
    );

    expect(mockErrorDetails).toHaveBeenCalledWith({
      description: "Could not load information of requested flight",
      showTryAgain: true,
      "data-testid": "error-details",
    });
  });
});

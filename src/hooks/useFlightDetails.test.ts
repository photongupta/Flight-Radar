import { renderHook, act, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import useFlightDetails from "./useFlightDetails";
import { getFlightDetails } from "../api/api";
import { FlightInfoData } from "../types/types";

jest.mock("../api/api", () => ({
  getFlightDetails: jest.fn(),
}));

describe("useFlightDetails hook", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetchFlightDetails should update flightDetails on success", async () => {
    const mockResponse: FlightInfoData = {
      id: 1,
      airline: "Airline",
      flightNumber: "AA123",
      status: "On Time",
      origin: "JFK",
      destination: "LAX",
      departureTime: "2024-09-15T10:00:00Z",
    };

    (getFlightDetails as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFlightDetails());

    act(() => {
      result.current.fetchFlightDetails(1);
    });

    await waitFor(() => {
      expect(result.current.flightDetails).toEqual(mockResponse);
    });

    await waitFor(() => {
      expect(result.current.fetchFlightDetailsError).toEqual({
        isError: false,
        description: "",
      });
    });
  });

  it("fetchFlightDetails should handle errors correctly", async () => {
    const mockError = "Failed to fetch";

    (getFlightDetails as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useFlightDetails());

    act(() => {
      result.current.fetchFlightDetails(1);
    });

    await waitFor(() => {
      expect(result.current.flightDetails).toEqual({
        id: 0,
        airline: "",
        flightNumber: "",
        status: "",
        origin: "",
        destination: "",
        departureTime: "",
      });
    });

    await waitFor(() => {
      expect(result.current.fetchFlightDetailsError).toEqual({
        isError: true,
        description: mockError,
      });
    });
  });
});

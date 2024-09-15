import { renderHook, waitFor } from "@testing-library/react";
import useFlights from "./useFlights";
import { getFlights } from "../api/api";
import { FlightInfoData, ErrorDetails } from "../types/types";

jest.mock("../api/api", () => ({
  getFlights: jest.fn(),
}));

describe("useFlights Hook", () => {
  const mockFlights: FlightInfoData[] = [
    {
      id: 1,
      flightNumber: "AA123",
      airline: "American Airlines",
      origin: "New York",
      destination: "London",
      departureTime: "2024-10-01T12:00:00Z",
      status: "On Time",
    },
  ];

  const mockError: ErrorDetails = {
    isError: true,
    description: "Failed to fetch flights",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initialize with empty flights and no errors", () => {
    (getFlights as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useFlights());

    expect(result.current.flights).toEqual([]);
    expect(result.current.fetchFlightsError).toEqual({
      isError: false,
      description: "",
    });
  });

  it("should fetch flights successfully", async () => {
    (getFlights as jest.Mock).mockResolvedValue(mockFlights);

    const { result } = await renderHook(() => useFlights());

    await waitFor(() => {
      expect(result.current.flights).toEqual(mockFlights);
    });

    await waitFor(() => {
      expect(result.current.fetchFlightsError).toEqual({
        isError: false,
        description: "",
      });
    });
  });

  it("should handle API errors", async () => {
    (getFlights as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useFlights());

    await waitFor(() => {
      expect(result.current.flights).toEqual([]);
    });

    await waitFor(() => {
      expect(result.current.fetchFlightsError).toEqual({
        isError: true,
        description: mockError,
      });
    });
  });

  it("should fetch flights details every 5 seconds", () => {
    (getFlights as jest.Mock).mockResolvedValue(mockFlights);

    const { unmount } = renderHook(() => useFlights());

    jest.advanceTimersByTime(5000);

    expect(getFlights).toHaveBeenCalledTimes(2);

    unmount();
  });
});

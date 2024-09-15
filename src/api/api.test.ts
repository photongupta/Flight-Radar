import { getFlights, getFlightDetails } from "./api";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("API functions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("getFlights should fetch flight data and return JSON", async () => {
    const mockResponse = { flights: [{ id: 1, flightNumber: "AA123" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const flights = await getFlights();

    expect(flights).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://flight-status-mock.core.travelopia.cloud/flights",
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("getFlightDetails should fetch flight details and return JSON", async () => {
    const flightId = 1;
    const mockResponse = {
      id: flightId,
      flightNumber: "AA123",
      details: "Details about the flight",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const flightDetails = await getFlightDetails(flightId);

    expect(flightDetails).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://flight-status-mock.core.travelopia.cloud/flights/${flightId}`,
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

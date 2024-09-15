export interface FlightInfoData {
  id: number;
  airline: string;
  flightNumber: string;
  status: string;
  origin: string;
  destination: string;
  departureTime: string;
}

export interface ErrorDetails {
  isError: boolean;
  description: string;
}

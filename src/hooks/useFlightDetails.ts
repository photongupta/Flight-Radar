import { useState } from "react";
import { getFlightDetails } from "../api/api";
import { FlightInfoData, ErrorDetails } from "../types/types";

interface UseFlightDetailsReturn {
  fetchFlightDetails: (id: number) => void;
  flightDetails: FlightInfoData;
  fetchFlightDetailsError: ErrorDetails;
  isLoading: boolean;
}

const useFlightDetails = (): UseFlightDetailsReturn => {
  const defaultFlightDetails = {
    id: 0,
    airline: "",
    flightNumber: "",
    status: "",
    origin: "",
    destination: "",
    departureTime: "",
  };
  const [flightDetails, setFlightDetails] =
    useState<FlightInfoData>(defaultFlightDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchFlightDetailsError, setFetchFlightDetailsError] =
    useState<ErrorDetails>({ isError: false, description: "" });

  const fetchFlightDetails = (id: number) => {
    setIsLoading(true);
    getFlightDetails(id)
      .then((data) => {
        setIsLoading(false);
        setFlightDetails(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setFetchFlightDetailsError({ isError: true, description: err });
      });
  };

  return {
    fetchFlightDetails,
    flightDetails,
    fetchFlightDetailsError,
    isLoading,
  };
};

export default useFlightDetails;

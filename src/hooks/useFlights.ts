import { useEffect, useState } from "react";
import { getFlights } from "../api/api";
import { FlightInfoData, ErrorDetails } from "../types/types";

interface UseFlightsReturn {
  flights: FlightInfoData[];
  fetchFlightsError: ErrorDetails;
  isLoading: boolean;
}

const useFlights = (): UseFlightsReturn => {
  const [flights, setFlights] = useState<FlightInfoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchFlightsError, setFetchFlightsError] = useState<ErrorDetails>({
    isError: false,
    description: "",
  });
  const REFRES_INTERVAL = 5000;

  const fetchFlight = () => {
    getFlights()
      .then((data) => {
        setFlights(data);
      })
      .catch((err) => {
        setFetchFlightsError({ isError: true, description: err });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getFlights()
      .then((data) => {
        setIsLoading(false);
        setFlights(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setFetchFlightsError({ isError: true, description: err });
      });

    const timerId = setInterval(() => {
      fetchFlight();
    }, REFRES_INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { flights, fetchFlightsError, isLoading };
};

export default useFlights;

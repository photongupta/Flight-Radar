import React from "react";
import useFlights from "../../../hooks/useFlights";
import { useNavigate } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";
import statusColorMap from "../../../utils/colorCode";
import ErrorDetails from "../../ErrorDetails/ErrorDetails";
import {
  Button,
  Table,
  Row,
  Cell,
  HeaderCell,
  HeaderRow,
  Loader,
} from "./FlightList.style";

const FlightList = () => {
  const { flights, fetchFlightsError, isLoading } = useFlights();
  const navigate = useNavigate();

  const getFlights = () => {
    return flights.map((flight) => {
      const departureTime = new Date(flight.departureTime);

      return (
        <Row
          key={flight.id}
          onClick={() => {
            navigate(`flight-details/${flight.id}`);
          }}
        >
          <Cell>&nbsp;{flight.airline}</Cell>
          <Cell>{flight.flightNumber}</Cell>
          <Cell>{flight.origin}</Cell>
          <Cell>{flight.destination}</Cell>
          <Cell>{`${flight.departureTime ? formatInTimeZone(departureTime, "America/New_York", "dd-MMM-yyyy HH:mm") : flight.departureTime}`}</Cell>
          <Cell>
            <Button
              data-testid={`button-${flight.id}`}
              color={statusColorMap[flight.status]}
            >
              {flight.status}
            </Button>
          </Cell>
        </Row>
      );
    });
  };

  const getFlightTable = () => {
    return (
      <Table list-style="none">
        <tbody>
          <HeaderRow>
            <HeaderCell>&nbsp;Air line</HeaderCell>
            <HeaderCell>Flight Number</HeaderCell>
            <HeaderCell>Origin</HeaderCell>
            <HeaderCell>Destination</HeaderCell>
            <HeaderCell>Departure Time</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </HeaderRow>
          {getFlights()}
        </tbody>
      </Table>
    );
  };

  const getData = () => {
    return fetchFlightsError.isError ? (
      <ErrorDetails
        data-testid="error-details"
        description={"Could not load flights information."}
        showTryAgain
      />
    ) : (
      getFlightTable()
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader data-testid="loader">Loading Flight Details... </Loader>
      ) : (
        getData()
      )}
    </>
  );
};

export default FlightList;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";
import {
  FlightCard,
  AirLine,
  FlightNumber,
  Origin,
  Destination,
  DepartureTime,
  Status,
  InfoWrapper,
  Top,
  IdentityWrapper,
  StatusWrapper,
  ConnectingIcon,
  Loader,
} from "./FlightDetails.style";
import useFlightDetails from "../../hooks/useFlightDetails";
import Header from "../Header/Header";
import statusColorMap from "../../utils/colorCode";
import ErrorDetails from "../ErrorDetails/ErrorDetails";

const FlightInfo = () => {
  const { id } = useParams();
  const {
    fetchFlightDetails,
    flightDetails,
    isLoading,
    fetchFlightDetailsError,
  } = useFlightDetails();
  const [departureTime, setDepartureTime] = useState<string>("");

  useEffect(() => {
    fetchFlightDetails(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (flightDetails.departureTime) {
      setDepartureTime(flightDetails.departureTime);
    }
  }, [flightDetails.departureTime]);

  const getFlightDetails = () => {
    return (
      <FlightCard data-testid="flight-tile">
        <Top>
          <IdentityWrapper>
            <AirLine data-testid="airline">{flightDetails.airline}</AirLine>
            <FlightNumber data-testid="flight-number">
              {flightDetails.flightNumber}
            </FlightNumber>
          </IdentityWrapper>

          <StatusWrapper>
            <Status
              data-testid="status"
              color={statusColorMap[flightDetails.status]}
            >
              {flightDetails.status}
            </Status>
          </StatusWrapper>
        </Top>

        <InfoWrapper>
          From:&nbsp;
          <Origin data-testid="origin">{` ${flightDetails.origin}`}</Origin>
          <ConnectingIcon src="../logo_black.png" />
          To:&nbsp;
          <Destination data-testid="destination">{` ${flightDetails.destination}`}</Destination>
        </InfoWrapper>

        {departureTime && (
          <DepartureTime data-testid="departure-time">{`Departure Time: ${formatInTimeZone(new Date(departureTime), "America/New_York", "yyyy-MMM-dd HH:mm")}`}</DepartureTime>
        )}
      </FlightCard>
    );
  };

  const getData = () => {
    return fetchFlightDetailsError.isError ? (
      <ErrorDetails
        data-testid="error-details"
        description={`Could not load information of requested flight`}
        showTryAgain
      />
    ) : (
      getFlightDetails()
    );
  };

  return (
    <>
      <Header
        title={`${flightDetails.airline} - ${flightDetails.flightNumber}`}
        imagePath="../logo_white.png"
      />
      {isLoading ? (
        <Loader data-testid="loader">Loading Flight Details... </Loader>
      ) : (
        getData()
      )}
    </>
  );
};

export default FlightInfo;

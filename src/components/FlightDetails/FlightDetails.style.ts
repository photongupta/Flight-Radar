import styled from "styled-components";

export const FlightCard = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  margin: 10px;
  align-self: center;
  width: 40%;
  margin-left: 28%;
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.div`
  background-color: #12184f;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

export const IdentityWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  flex: 1;
  color: white;
`;

export const StatusWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 30px;
  color: white;
`;

export const AirLine = styled.h3`
  margin-left: 20px;
`;

export const FlightNumber = styled.div`
  margin: 20px;
`;

export const Origin = styled.div`
  color: #12184f;
  font-weight: 600;
`;

export const ConnectingIcon = styled.img`
  height: 40px;
  width: 40px;
  margin-left: 22px;
  margin-right: 20px;
`;

export const Destination = styled.div`
  color: #12184f;
  font-weight: 600;
`;

export const DepartureTime = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 15px;
  color: #12184f;
  font-weight: bold;
`;

export const Status = styled.div`
  margin-right: 20px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

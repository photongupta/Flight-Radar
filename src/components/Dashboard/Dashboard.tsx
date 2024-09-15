import React from "react";

import HeaderWrapper from "../Header/Header";
import FlightList from "./FlightList/FlightList";

const Dashboard = () => {
  return (
    <>
      <HeaderWrapper title="Flight Radar" imagePath="logo_white.png" />
      <FlightList />
    </>
  );
};

export default Dashboard;

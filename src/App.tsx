import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import FlightDetails from "./components/FlightDetails/FlightDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard data-testid="dashboard" />} />
      <Route
        path="/flight-details/:id"
        element={<FlightDetails data-testid="dashboard" />}
      />
    </Routes>
  );
};

export default App;

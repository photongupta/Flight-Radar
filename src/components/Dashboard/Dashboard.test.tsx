import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

jest.mock("../Header/Header", () => () => <div>HeaderMock</div>);
jest.mock("./FlightList/FlightList", () => () => <div>FlightListMock</div>);

describe("FlightList Component", () => {
  it("should render Header and FlightList components", () => {
    render(<Dashboard />);

    expect(screen.getByText("HeaderMock")).toBeInTheDocument();
    expect(screen.getByText("FlightListMock")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorDetails from "./ErrorDetails";

describe("ErrorDetails Component", () => {
  it("should render error description correctly", () => {
    const description = "An error occurred!";
    const showTryAgain = false;

    render(
      <ErrorDetails description={description} showTryAgain={showTryAgain} />,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
    expect(
      screen.queryByText("Try again after some time!!!"),
    ).not.toBeInTheDocument();
  });

  it('should render "Try again" message when showTryAgain is true', () => {
    const description = "An error occurred!";
    const showTryAgain = true;

    render(
      <ErrorDetails description={description} showTryAgain={showTryAgain} />,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
    expect(
      screen.getByText("Try again after some time!!!"),
    ).toBeInTheDocument();
  });
});

import React from "react";
import { ErrorDescription } from "./ErrorDetails.style";

interface ErrorProps {
  description: string;
  showTryAgain: boolean;
}

const ErrorDetails: React.FC<ErrorProps> = ({ description, showTryAgain }) => {
  return (
    <>
      <ErrorDescription>{description}</ErrorDescription>
      {showTryAgain && (
        <ErrorDescription>Try again after some time!!!</ErrorDescription>
      )}
    </>
  );
};

export default ErrorDetails;

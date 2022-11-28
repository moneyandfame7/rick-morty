import React, { FC } from "react";
import Wrapper from "../../layouts/Wrapper";

interface IErrorMessage {
  error?: Error;
}
const ErrorMessage: FC<IErrorMessage> = ({ error }) => {
  return (
    <Wrapper>
      <h1>{error?.message}</h1>
    </Wrapper>
  );
};

export default ErrorMessage;

import React, { FC } from "react";
import Wrapper from "../../layouts/Wrapper";

interface IErrorMessage {
  error?: string | Error;
}
const ErrorMessage: FC<IErrorMessage> = ({ error }) => {
  return (
    <Wrapper>
      <h1>{typeof error === "string" ? error : error?.message}</h1>
    </Wrapper>
  );
};

export default ErrorMessage;

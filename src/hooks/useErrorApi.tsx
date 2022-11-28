import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

export const useErrorApi = () => {
  const [isErrorApi, setIsErrorApi] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<Error>();
  const render = (node: React.ReactElement): React.ReactElement => {
    if (isErrorApi) {
      return <ErrorMessage error={messageError} />;
    }

    return node;
  };

  return { setIsErrorApi, render, setMessageError };
};

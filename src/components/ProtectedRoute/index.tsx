import React, { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { hasPassedWelcome, isAuthenticated } from "../../redux/selectors";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isUserAuthenticated = useAppSelector(isAuthenticated);
  const hasUserPassedWelcome = useAppSelector(hasPassedWelcome);

  if (!isUserAuthenticated) {
    console.log("Not auth");
    return <Navigate to='/login' replace />;
  }

  if (isUserAuthenticated && !hasUserPassedWelcome) {
    console.log("Auth but loh");
    return <Navigate to='/welcome' replace />;
  }

  console.log("Auth and cold");

  return <>{children}</>;
};

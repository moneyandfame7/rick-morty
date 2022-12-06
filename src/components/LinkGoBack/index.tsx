import React, { FC } from "react";
import { useNavigate } from "react-router";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
const LinkGoBack: FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button onClick={handleGoBack} variant='contained' sx={{ gap: "5px" }}>
      <ArrowBack />
      <span>Go back</span>
    </Button>
  );
};

export default LinkGoBack;

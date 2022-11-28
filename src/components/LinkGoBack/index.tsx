import React, { FC } from "react";
import styles from "./LinkGoBack.module.scss";
import { useNavigate } from "react-router";
import { ArrowBack } from "@mui/icons-material";
const LinkGoBack: FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button onClick={handleGoBack} className={styles.link}>
      <ArrowBack />
      <span>Go back</span>
    </button>
  );
};

export default LinkGoBack;

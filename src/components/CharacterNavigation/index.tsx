import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "./CharacterNavigation.module.scss";
import { IEntity } from "../../interfaces";
import { NavigationTypeEnum } from "../../constants/api";
import { Stack } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";

interface INavigationProps {
  prev: string | null | undefined;
  next: string | null | undefined;
  navigationType: NavigationTypeEnum;
  isLoading: boolean;
}

const Navigation = ({ prev, next, navigationType, isLoading }: INavigationProps) => {
  const queryPage = Number(useQueryParams().get("page"));

  return (
    <Stack direction='row' gap={3} justifyContent='center'>
      <Link to={`/${navigationType}?page=${queryPage - 1}`}>
        <Button title='Previous' disabled={!prev || isLoading} />
      </Link>
      <Link to={`/${navigationType}?page=${queryPage + 1}`}>
        <Button title='Next' disabled={!next || isLoading} />
      </Link>
    </Stack>
  );
};

export default Navigation;

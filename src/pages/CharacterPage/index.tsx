import React, { useState } from "react";
import Navigation from "../../components/CharacterNavigation";
import CharacterList from "../../components/CardList";
import Button from "../../components/Button";
import { CircularProgress, Container, Stack } from "@mui/material";
import { useFetchCharactersQuery } from "../../redux/slices/rickMortyApiSlice";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, Link as RouterLink } from "react-router-dom";
import styles from "../../components/CharacterNavigation/CharacterNavigation.module.scss";
import { useQueryParams } from "../../hooks/useQueryParams";
import { NavigationTypeEnum } from "../../constants/api";
import { useLocation, useOutlet } from "react-router";

const CharacterPage: React.FC = () => {
  const queryPage = Number(useQueryParams().get("page"));
  const { data, isLoading, isError, error } = useFetchCharactersQuery(queryPage);

  // TODO: переписать на RTK Query ( maybe )
  // TODO: Make error handler for query
  // TODO: Remake navigation
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ marginTop: "30px" }} />
      ) : (
        <>
          <Navigation
            isLoading={isLoading}
            prev={data?.info.prev}
            next={data?.info.next}
            navigationType={NavigationTypeEnum.CHARACTER}
          />
          <CharacterList items={data?.results} />
        </>
      )}
    </>
  );
};

export default CharacterPage;

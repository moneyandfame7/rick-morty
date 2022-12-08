import React from "react";
import Navigation from "../components/Navigation";
import CharacterList from "../components/CardList";
import ErrorMessage from "../components/ErrorMessage";
import { CircularProgress } from "@mui/material";
import { NavigationTypeEnum } from "../constants/api";
import { useFetchCharactersQuery } from "../redux/slices/rickMortyApiSlice";
import { useQueryParams } from "../hooks/useQueryParams";

const CharacterPage: React.FC = () => {
  const queryPage = Number(useQueryParams().get("page"));
  const { data, isLoading, isError, error } = useFetchCharactersQuery(queryPage);

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

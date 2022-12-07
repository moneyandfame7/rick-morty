import React from "react";
import { API_CHARACTER_ALL, NavigationTypeEnum } from "../../constants/api";
import { ICharacter } from "../../interfaces";
import { useErrorApi } from "../../hooks/useErrorApi";
import Navigation from "../../components/CharacterNavigation";
import CharacterList from "../../components/CardList";
import { CircularProgress } from "@mui/material";
import { useDataFromApi } from "../../hooks/useDataFromApi";
import { useFetchCharactersQuery } from "../../redux/slices/rickMortyApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const CharacterPage: React.FC = () => {
  const { setIsErrorApi, render, setMessageError } = useErrorApi();
  // const { prevPage, nextPage, counterPage, isLoading, data, getResource } = useDataFromApi<ICharacter[]>({
  //   url: API_CHARACTER_ALL,
  //   setIsErrorApi,
  //   setMessageError,
  // });

  const { data = {}, isLoading, isError, error } = useFetchCharactersQuery(13123123);

  console.log(useFetchCharactersQuery());
  // TODO: переписать на RTK Query ( maybe )
  // TODO: Make error handler for query
  // TODO: Remake navigation
  isError ? console.log(error) : console.log("No error");
  return render(
    <>
      <h1>CHARACTER_PAGE</h1>
      {!isLoading && isError ? (error as FetchBaseQueryError).status : <CircularProgress sx={{ marginTop: 5 }} />}
      {/*<Navigation<ICharacter>*/}
      {/*  getResource={getResource}*/}
      {/*  prevPage={prevPage}*/}
      {/*  nextPage={nextPage}*/}
      {/*  counterPage={counterPage}*/}
      {/*  navigationType={NavigationTypeEnum.CHARACTER}*/}
      {/*/>*/}
      {/*{isLoading ? <CircularProgress sx={{ marginTop: "30px" }} /> : <CharacterList items={data} />}*/}
    </>
  );
};

export default CharacterPage;

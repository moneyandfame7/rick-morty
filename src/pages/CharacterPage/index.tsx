import React from "react";
import { API_CHARACTER_ALL, NavigationTypeEnum } from "../../constants/api";
import { ICharacter } from "../../interfaces";
import styles from "./CharacterPage.module.scss";
import { useErrorApi } from "../../hooks/useErrorApi";
import Navigation from "../../components/CharacterNavigation";
import CharacterList from "../../components/CardList";
import { CircularProgress } from "@mui/material";
import { useDataFromApi } from "../../hooks/useDataFromApi";

const CharacterPage: React.FC = () => {
  const { setIsErrorApi, render, setMessageError } = useErrorApi();
  const { prevPage, nextPage, counterPage, isLoading, data, getResource } = useDataFromApi<ICharacter[]>({
    url: API_CHARACTER_ALL,
    setIsErrorApi,
    setMessageError,
  });
  // TODO: пофиксить роутинг повсюду
  return render(
    <>
      <Navigation<ICharacter>
        getResource={getResource}
        prevPage={prevPage}
        nextPage={nextPage}
        counterPage={counterPage}
        navigationType={NavigationTypeEnum.CHARACTER}
      />
      {isLoading ? <CircularProgress className={styles.loader} /> : <CharacterList items={data} />}
    </>
  );
};

export default CharacterPage;

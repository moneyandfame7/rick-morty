import React, { createContext, useEffect, useState } from "react";
import { getApiResource, ICharactersResponse } from "../../utils/fetch";
import { API_CHARACTER_ALL } from "../../constants/api";
import { ICharacter } from "../../interfaces";
import styles from "./CharacterPage.module.scss";
import { useErrorApi } from "../../hooks/useErrorApi";
import { useQueryParams } from "../../hooks/useQueryParams";
import CharacterNavigation from "../../components/CharacterNavigation";
import CardList from "../../components/CardList";
import { CircularProgress } from "@mui/material";

export interface ICharacterContext {
  characters: ICharacter[] | undefined;
  getResource: (url: string) => Promise<void>;
  prevPage: string | null;
  nextPage: string | null;
  counterPage: number;
}
export const CharacterContext = createContext<ICharacterContext>(undefined!);

const CharacterPage: React.FC = () => {
  const { setIsErrorApi, render } = useErrorApi();

  const query = useQueryParams();
  const queryPage = query.get("page");

  const [characters, setCharacters] = useState<ICharacter[]>();
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [counterPage, setCounterPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getResource = async (url: string) => {
    setIsLoading(true);

    const res = await getApiResource<ICharactersResponse>(url);

    if (res) {
      setCharacters(res.results);
      setPrevPage(res.info.prev);
      setNextPage(res.info.next);
      setIsErrorApi(false);
      setCounterPage(Number(queryPage));
      setIsLoading(false);
    } else {
      setIsErrorApi(true);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getResource(API_CHARACTER_ALL + queryPage);
  }, [queryPage]);

  return render(
    <CharacterContext.Provider value={{ characters, getResource, prevPage, nextPage, counterPage }}>
      <CharacterNavigation />
      {isLoading ? <CircularProgress className={styles.loader} /> : <CardList />}
    </CharacterContext.Provider>
  );
};

export default CharacterPage;

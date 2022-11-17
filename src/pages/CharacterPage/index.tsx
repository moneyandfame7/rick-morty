import React, { useEffect, useState } from "react";
import { getApiResource, ICharactersResponse } from "../../utils/fetch";
import { API_CHARACTER } from "../../constants/api";
import { ICharacter } from "../../interfaces";
import styles from "./CharacterPage.module.scss";
import CharacterCard from "../../components/Card";
import Wrapper from "../../layouts/Wrapper";
import { CircularProgress } from "@mui/material";
import { useErrorApi } from "../../hooks/useErrorApi";

const CharacterPage: React.FC = () => {
  const { setIsErrorApi, render } = useErrorApi();
  const [characters, setCharacters] = useState<ICharacter[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await getApiResource<ICharactersResponse>(API_CHARACTER + "1");

      if (res) {
        setCharacters(res.results);
        setIsLoading(false);
        setIsErrorApi(false);
      } else {
        setIsErrorApi(true);
      }
    })();
  }, []);

  console.log(characters);
  return render(
    <Wrapper>
      <section className={styles.container}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          characters?.map(character => (
            <CharacterCard
              key={character.id}
              name={character.name}
              info={character.status + " - " + character.species}
              imageUrl={character.image}
              location={character.location}
              episodeUrl={character.episode[0]}
            />
          ))
        )}
      </section>
    </Wrapper>
  );
};

export default CharacterPage;

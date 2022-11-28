import React, { FC, useEffect, useState } from "react";
import { getApiResource } from "../../utils/fetch";
import { useParams } from "react-router";
import { API_CHARACTER_ONLY_ONE } from "../../constants/api";
import { ICharacter } from "../../interfaces";
import styles from "./InfoAboutCharacterPage.module.scss";
import { CircularProgress } from "@mui/material";
import LinkGoBack from "../../components/LinkGoBack";
import CharacterEpisodes from "../../components/CharacterEpisodes";
import { useErrorApi } from "../../hooks/useErrorApi";

const InfoAboutCharacterPage: FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<ICharacter>();
  const [episodes, setEpisodes] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setMessageError, setIsErrorApi, render } = useErrorApi();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getApiResource<ICharacter>(`${API_CHARACTER_ONLY_ONE}/${id}`);

      if (res) {
        console.log(res);
        setCharacter(res);
        setIsLoading(false);
        res.episode.length && setEpisodes(res.episode);
      } else {
        setIsLoading(false);
        setMessageError(new Error("ERROR_DATA_FETCHING"));
        setIsErrorApi(true);
      }
    })();
  }, []);

  return render(
    isLoading ? (
      <CircularProgress />
    ) : (
      <div className={styles.wrapper}>
        <LinkGoBack />

        <main className={styles.main}>
          <aside className={styles.leftBar}>
            <div className={styles.imageWrapper}>
              <img src={character?.image} alt={character?.name} width={300} height={300} />
            </div>
            <div className={styles.table}>
              <div className={styles.row}>
                <b className={styles.key}>Last known location:</b>
                <p className={styles.info}>{character?.location.name}</p>
              </div>
              <div className={styles.row}>
                <b className={styles.key}>First seen in episode:</b>
                <p className={styles.info}>{}</p>
              </div>
              <div className={styles.row}>
                <b className={styles.key}>Gender: </b>
                <p className={styles.info}>{character?.gender}</p>
              </div>
              <div className={styles.row}>
                <b className={styles.key}>Origin: </b>
                <p className={styles.info}>{character?.origin.name}</p>
              </div>
              <div className={styles.row}>
                <b className={styles.key}>Status: </b>
                <p className={styles.info}>{character?.status}</p>
              </div>
              <div className={styles.row}>
                <b className={styles.key}>Species: </b>
                <p className={styles.info}>{character?.species}</p>
              </div>
            </div>
          </aside>

          <section className={styles.about}>
            <h4>We will meet {character?.name} in the episode: </h4>
            {episodes && <CharacterEpisodes episodes={episodes} />}
          </section>
        </main>
      </div>
    )
  );
};

export default InfoAboutCharacterPage;

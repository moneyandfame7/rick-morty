import React, { FC, useEffect, useState } from "react";
import { getApiResource } from "../../utils/fetch";
import { useParams } from "react-router";
import { API_CHARACTER_ONLY_ONE } from "../../constants/api";
import { ICharacter, IEpisode } from "../../interfaces";
import styles from "./InfoAboutCharacterPage.module.scss";
import { CircularProgress } from "@mui/material";
import LinkGoBack from "../../components/LinkGoBack";

const InfoAboutCharacterPage: FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<ICharacter>();
  const [episode, setEpisode] = useState<IEpisode>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getApiResource<ICharacter>(`${API_CHARACTER_ONLY_ONE}/${id}`);

      if (res) {
        setCharacter(res);
        setIsLoading(false);
      } else {
        throw new Error("ERROR_DATA_FETCHING");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (character) {
        const episodeResponse = await getApiResource<IEpisode>(character.episode[0]);

        if (episodeResponse) {
          setEpisode(episodeResponse);
        }
      }
    })();
  }, [character]);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <main className={styles.main}>
      <LinkGoBack />
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
            <p className={styles.info}>{episode?.name}</p>
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
        <h1>{character?.name}</h1>
      </section>
    </main>
  );
};

export default InfoAboutCharacterPage;

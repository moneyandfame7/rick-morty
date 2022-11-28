import React, { FC, useEffect, useState } from "react";
import { makeConcurrentRequest } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { IEpisode } from "../../interfaces";
import styles from "./CharacterEpisode.module.scss";
import { CircularProgress } from "@mui/material";
interface ICharacterEpisodes {
  episodes: string[];
}

const CharacterEpisodes: FC<ICharacterEpisodes> = ({ episodes }) => {
  const [episodesName, setEpisodesName] = useState<IEpisode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await makeConcurrentRequest(episodes);

      if (response) {
        setEpisodesName(response);
        console.log(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error("FAILED TO FETCH DATA");
      }
    })();
  }, []);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <ul className={styles.list}>
      {episodesName.map(item => (
        <li key={item.id}>
          <b style={{ width: "100px" }} className={styles.title}>
            Episode {item.id}:{" "}
          </b>
          <Link to={`/episode/${item.id}`} className={styles.link}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharacterEpisodes;

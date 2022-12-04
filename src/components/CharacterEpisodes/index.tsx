import React, { FC, useEffect, useState } from "react";
import { makeConcurrentRequest } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { IEpisode } from "../../interfaces";
import styles from "./CharacterEpisode.module.scss";
import { CircularProgress } from "@mui/material";
import { ListGroup } from "react-bootstrap";
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
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error("FAILED TO FETCH DATA");
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <ListGroup variant='flush' as='ol' numbered>
      {episodesName.map(item => (
        <ListGroup.Item as='li' action key={item.id}>
          <Link to={`/episode/${item.id}`} className={styles.link}>
            {item.name}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CharacterEpisodes;

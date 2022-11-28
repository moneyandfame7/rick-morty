import * as React from "react";
import { FC, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { IEpisode } from "../../interfaces";
import { getApiResource } from "../../utils/fetch";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
interface ICharacterCard {
  status: string;
  name: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  episode: Array<string>;
  id: number;
}

const CharacterCard: FC<ICharacterCard> = ({ status, name, image, location, episode, id }) => {
  const [episodeName, setEpisodeName] = useState<IEpisode>();

  useEffect(() => {
    (async () => {
      const episodeResponse = await getApiResource<IEpisode>(episode[0]);

      if (episodeResponse) {
        setEpisodeName(episodeResponse);
      }
    })();
  }, []);

  const setMarker = () => {
    switch (true) {
      case status.includes("Dead"):
        return styles.redMarker;
      case status.includes("Alive"):
        return styles.greenMarker;
      default:
        return styles.grayMarker;
    }
  };
  return (
    <Link to={`/character/${id}`} className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.section}>
          <h5 className={styles.name}>{name}</h5>
          <div className={styles.wrapperAbout}>
            <span className={setMarker()}></span>
            <p className={styles.about}>{status}</p>
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.subtitle}>Last known location:</p>
          <p>{location.name}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.subtitle}>First seen in:</p>
          {!episodeName ? <Skeleton animation='wave' /> : <p>{episodeName.name}</p>}
        </div>
      </div>
    </Link>
  );
};
export default CharacterCard;

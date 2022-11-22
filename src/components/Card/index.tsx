import * as React from "react";
import { FC, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { IEpisode } from "../../interfaces";
import { getApiResource } from "../../utils/fetch";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
interface ICharacterCard {
  info: string;
  name: string;
  imageUrl: string;
  location: {
    name: string;
    url: string;
  };
  episodeUrl: string;
  episodeName?: string;
  id: number;
}

const CharacterCard: FC<ICharacterCard> = ({ info, name, imageUrl, location, episodeUrl, id }) => {
  const [episode, setEpisode] = useState<IEpisode>();

  useEffect(() => {
    (async () => {
      const episodeResponse = await getApiResource<IEpisode>(episodeUrl);

      if (episodeResponse) {
        setEpisode(episodeResponse);
      }
    })();
  }, []);

  const setMarker = () => {
    switch (true) {
      case info.includes("Dead"):
        return styles.redMarker;
      case info.includes("Alive"):
        return styles.greenMarker;
      default:
        return styles.grayMarker;
    }
  };
  return (
    <Link to={`/character/${id}`} className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={name} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.section}>
          <h5 className={styles.name}>{name}</h5>
          <div className={styles.wrapperAbout}>
            <span className={setMarker()}></span>
            <p className={styles.about}>{info}</p>
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.subtitle}>Last known location:</p>
          <p>{location.name}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.subtitle}>First seen in:</p>
          {!episode ? <Skeleton animation='wave' /> : <p>{episode.name}</p>}
        </div>
      </div>
    </Link>
  );
};
export default CharacterCard;

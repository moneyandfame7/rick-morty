import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CharacterEpisode.module.scss";
import { CircularProgress } from "@mui/material";
import { ListGroup } from "react-bootstrap";
import { fetchEpisodes } from "../../redux/slices/episodesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ErrorMessage from "../ErrorMessage";

interface ICharacterEpisodes {
  episodes: string[];
}
const CharacterEpisodes: FC<ICharacterEpisodes> = ({ episodes }) => {
  const dispatch = useAppDispatch();
  const { error, loading, fetchedEpisodes } = useAppSelector(state => state.episodes);

  useEffect(() => {
    dispatch(fetchEpisodes(episodes));
  }, []);
  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <CircularProgress />}
      {!loading && !error && (
        <ListGroup variant='flush' as='ol' numbered>
          {fetchedEpisodes.map(item => (
            <ListGroup.Item as='li' action key={item.id}>
              <Link to={`/episode/${item.id}`} className={styles.link}>
                {item.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default CharacterEpisodes;

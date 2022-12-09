import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToFavorite, removeFromFavorite } from "../../redux/slices/charactersSlice";
import { getCharacters } from "../../redux/selectors";
import { useFetchCharacterByIdQuery } from "../../redux/slices/rickMortyApiSlice";
import { Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import EpisodeList from "../../components/EpisodeList";
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./InfoAboutCharacterPage.module.scss";
import "./Custom.scss";
import { ICharacter } from "../../interfaces";

const InfoAboutCharacterPage: FC = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { data, isLoading, error } = useFetchCharacterByIdQuery(Number(Number(id)));
  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector(getCharacters);
  const handleOnFavoriteIconClick = (): void => {
    if (data) {
      if (isFavorite) {
        dispatch(removeFromFavorite(data.id));
        setIsFavorite(false);
      } else {
        dispatch(addToFavorite(data));
        setIsFavorite(true);
      }
    }
  };
  const getCharacterStatus = () => {
    switch (data?.status) {
      case "Alive":
        return (
          <Alert severity='success'>
            <AlertTitle>Alive</AlertTitle>
            She/He is lucky — <strong>alive!</strong>
          </Alert>
        );
      case "Dead":
        return (
          <Alert severity='error'>
            <AlertTitle>Dead</AlertTitle>
            Fortunately (or not fortunately for someone) - he is <strong>dead!</strong>
          </Alert>
        );
      default:
        return (
          <Alert severity='info'>
            <AlertTitle>Unknown</AlertTitle>
            She/he is ... <strong>unknown!</strong>
          </Alert>
        );
    }
  };

  useEffect(() => {
    try {
      console.log(favoriteCharacters);
      const favIndex = (favoriteCharacters as any[]).find(c => c.id === data?.id);
      !favIndex ? setIsFavorite(false) : setIsFavorite(true);
    } catch (e) {
      throw new Error("Error in favoriteCharacters");
    }
  }, [data?.id, favoriteCharacters]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.infoCard}>
          <div className={styles.imageWrapper}>
            <img src={data?.image} alt={data?.name} width={300} height={300} />
          </div>
          {getCharacterStatus()}
          {!isFavorite ? (
            <Button color='success' variant='contained' onClick={handleOnFavoriteIconClick}>
              Add to favorite
            </Button>
          ) : (
            <Button variant='contained' color='error' onClick={handleOnFavoriteIconClick}>
              Remove from favorite
            </Button>
          )}
          <div>
            <Accordion>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Last known location</Accordion.Header>
                <Accordion.Body>{data?.location.name}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Gender</Accordion.Header>
                <Accordion.Body>{data?.gender}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='2'>
                <Accordion.Header>Origin</Accordion.Header>
                <Accordion.Body>{data?.origin.name}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='3'>
                <Accordion.Header>Species</Accordion.Header>
                <Accordion.Body>{data?.species}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <Card>
          <Card.Header>We will meet {data?.name} in the episode: </Card.Header>
          {data?.episode && <EpisodeList episodes={data.episode} />}
        </Card>
      </div>
    </div>
  );
};

export default InfoAboutCharacterPage;

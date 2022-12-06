import React, { FC, useEffect, useState } from "react";
import { getApiResource } from "../../utils/fetch";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useErrorApi } from "../../hooks/useErrorApi";
import { useParams } from "react-router";
import { API_CHARACTER_ONLY_ONE } from "../../constants/api";
import { ICharacter } from "../../interfaces";
import Accordion from "react-bootstrap/Accordion";
import { Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import LinkGoBack from "../../components/LinkGoBack";
import CharacterEpisodes from "../../components/CharacterEpisodes";
import { Card } from "react-bootstrap";
import styles from "./InfoAboutCharacterPage.module.scss";
import "./Custom.scss";
import { getCharacters } from "../../redux/selectors";
import { addToFavorite, removeFromFavorite } from "../../redux/slices/charactersSlice";
/*/TODO: вынести запрос на первый эпизод в InfoAboutCharacterPage*/

const InfoAboutCharacterPage: FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<ICharacter>();
  const [episodes, setEpisodes] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { setMessageError, setIsErrorApi, render } = useErrorApi();
  const dispatch = useAppDispatch();

  const favoriteCharacters = useAppSelector(getCharacters);

  console.log(favoriteCharacters, "FAVORITE CHARACTERS ARRAY");
  const handleOnFavoriteIconClick = (): void => {
    if (character) {
      if (isFavorite) {
        dispatch(removeFromFavorite(character.id));
        setIsFavorite(false);
      } else {
        dispatch(addToFavorite(character));
        setIsFavorite(true);
      }
    }
  };
  const getCharacterStatus = () => {
    switch (character?.status) {
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
    (async () => {
      setIsLoading(true);
      const res = await getApiResource<ICharacter>(`${API_CHARACTER_ONLY_ONE}/${id}`);

      const favIndex = favoriteCharacters.findIndex(c => c.id === res?.id);
      favIndex === -1 ? setIsFavorite(false) : setIsFavorite(true);

      if (res) {
        setCharacter(res);
        setIsLoading(false);
        res.episode.length && setEpisodes(res.episode);
      } else {
        setIsLoading(false);
        setMessageError(new Error("ERROR_DATA_FETCHING"));
        setIsErrorApi(true);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <Accordion.Body>{character?.location.name}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>Gender</Accordion.Header>
                  <Accordion.Body>{character?.gender}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                  <Accordion.Header>Origin</Accordion.Header>
                  <Accordion.Body>{character?.origin.name}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                  <Accordion.Header>Species</Accordion.Header>
                  <Accordion.Body>{character?.species}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </aside>
          <Card>
            <Card.Header>We will meet {character?.name} in the episode: </Card.Header>
            {episodes && <CharacterEpisodes episodes={episodes} />}
          </Card>
        </main>
      </div>
    )
  );
};

export default InfoAboutCharacterPage;

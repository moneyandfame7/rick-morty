import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../application/store'
import { addToFavorite, removeFromFavorite } from '../../features/characters/services/characters.slice'
import { Card } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material'
import { EpisodeList, ErrorMessage } from '../../components'
import styles from './InfoAboutCharacterPage.module.scss'
import './Custom.scss'
import _ from 'lodash'
import { useGetOneCharacterQuery } from '../../features/characters/services/api.slice'
import { selectFavoriteCharacters } from '../../features/characters/services/selector'
import { CharacterStatus } from '../../features/characters/type'

export const InfoAboutCharacterPage: FC = () => {
  const { id } = useParams()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const { data, isLoading, error } = useGetOneCharacterQuery(Number(id))
  const dispatch = useAppDispatch()
  const favoriteCharacters = useAppSelector(selectFavoriteCharacters)
  const handleOnFavoriteIconClick = (): void => {
    if (data) {
      if (isFavorite) {
        dispatch(removeFromFavorite(data.id))
        setIsFavorite(false)
      } else {
        dispatch(addToFavorite(data))
        setIsFavorite(true)
      }
    }
  }
  const getCharacterStatus = () => {
    if (data?.status !== undefined) {
      switch (data?.status) {
        case 'Alive' as CharacterStatus:
          return (
            <Alert severity='success'>
              <AlertTitle>Alive</AlertTitle>
              She/He is lucky — <strong>alive!</strong>
            </Alert>
          )
        case 'Dead' as CharacterStatus:
          return (
            <Alert severity='error'>
              <AlertTitle>Dead</AlertTitle>
              Fortunately (or not fortunately for someone) - he is <strong>dead!</strong>
            </Alert>
          )
        default:
          return (
            <Alert severity='info'>
              <AlertTitle>Unknown</AlertTitle>
              She/he is ... <strong>unknown!</strong>
            </Alert>
          )
      }
    }
  }

  useEffect(() => {
    const favIndex = _.findIndex(favoriteCharacters, o => o.id === data?.id)
    favIndex === -1 ? setIsFavorite(false) : setIsFavorite(true)
  }, [data?.id, favoriteCharacters])

  if (error) {
    return <ErrorMessage error={error} />
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
            <Button color='success' variant='contained' onClick={handleOnFavoriteIconClick} data-testid='btn-favorite'>
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
          {data?.episodes && <EpisodeList episodes={data.episodes} />}
        </Card>
      </div>
    </div>
  )
}

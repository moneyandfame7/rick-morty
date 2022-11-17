import React, { useEffect, useState } from "react"
import { getApiResource, ICharactersResponse } from "../../utils/fetch"
import { API_CHARACTER } from "../../constants/api"
import { ICharacter } from "../../interfaces"
import styles from "./CharacterPage.module.scss"
import CharacterCard from "../../components/Card"
import Wrapper from "../../layouts/Wrapper"
import { CircularProgress } from "@mui/material"

const CharacterPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>()
  useEffect(() => {
    ;(async () => {
      const res = await getApiResource<ICharactersResponse>(API_CHARACTER)
      if (res) {
        setCharacters(res.results)
      }
    })()
  }, [])

  console.log(characters)
  return (
    <Wrapper>
      <section className={styles.container}>
        {!characters ? (
          <CircularProgress />
        ) : (
          characters.map(character => (
            <CharacterCard
              key={character.id}
              name={character.name}
              info={character.status + " - " + character.species}
              imageUrl={character.image}
              location={character.location}
              episodeUrl={character.episode[0]}
            />
          ))
        )}
      </section>
    </Wrapper>
  )
}

export default CharacterPage

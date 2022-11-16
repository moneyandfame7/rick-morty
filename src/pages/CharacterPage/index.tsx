import React, { useContext, useEffect, useState } from "react"
import { getApiResource } from "../../utils/fetch"
import { API_CHARACTER, API_EPISODE, API_LOCATION } from "../../constants/api"
import { ICharacter } from "../../interfaces/character"
import styles from "./CharacterPage.module.scss"
import CharacterCard from "../../components/Card"

const CharacterPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>()

  useEffect(() => {
    ;(async () => {
      const res = await getApiResource(API_CHARACTER)
      if (res) {
        setCharacters(res.results)
      }
    })()
  }, [])

  return (
    <>
      <div className={styles.container}>
        {characters?.map(character => (
          <CharacterCard
            key={character.id}
            name={character.name}
            info={character.status + " - " + character.species}
            imageUrl={character.image}
            location={character.location}
            episode={character.episode}
          />
        ))}
      </div>
    </>
  )
}

export default CharacterPage

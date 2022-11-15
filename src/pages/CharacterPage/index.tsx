import React, { useEffect, useState } from "react"
import { getApiResource } from "../../utils/fetch"
import { API_CHARACTER, API_EPISODE, API_LOCATION } from "../../constants/api"
import { Character } from "../../interfaces/character"
import styles from "./CharacterPage.module.scss"
import cn from "classnames"
const CharacterPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>()

  useEffect(() => {
    ;(async () => {
      const res = await getApiResource(API_CHARACTER)
      if (res) {
        // const characterList = res.results.map(({ name, url }) => ({ name, url }))
        // console.log(characterList)
        // setCharacters(res.results.)
        setCharacters(res.results)
      }
    })()
  }, [])

  console.log(characters)

  return (
    <>
      <div className={styles.container}>
        {characters?.map(character => (
          <div key={character.id} className={styles.characterCard}>
            <div className={styles.section}>
              <h1 className={styles.name}>{character.name}</h1>
              <span className={styles.status}>
                <span
                  className={
                    character.status === "Dead"
                      ? styles.redMarker
                      : styles.greenMarker
                  }
                ></span>
                {character.status} - {character.species}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CharacterPage

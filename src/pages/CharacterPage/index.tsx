import React, { useContext, useEffect, useState } from "react"
import { getApiResource } from "../../utils/fetch"
import { API_CHARACTER, API_EPISODE, API_LOCATION } from "../../constants/api"
import { Character } from "../../interfaces/character"
import styles from "./CharacterPage.module.scss"
import cn from "classnames"
import CharacterCard from "../../components/Card"

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
          <CharacterCard
            key={character.id}
            name={character.name}
            buttonTitle='Share'
            info={character.status + " - " + character.gender}
            imageUrl={character.image}
          />
        ))}
      </div>
    </>
  )
}

export default CharacterPage

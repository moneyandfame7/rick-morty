import * as React from "react"
import { FC } from "react"
import styles from "./Card.module.scss"
interface ICharacterCard {
  info: string
  name: string
  imageUrl: string
  location: {
    name: string
    url: string
  }
  episode: string[]
}

const CharacterCard: FC<ICharacterCard> = ({
  info,
  name,
  imageUrl,
  location,
  episode,
}) => {
  const setMarker = () => {
    switch (true) {
      case info.includes("Dead"):
        return styles.redMarker
      case info.includes("Alive"):
        return styles.greenMarker
      default:
        return styles.grayMarker
    }
  }
  return (
    <article className={styles.cardWrapper}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={styles.image}
      ></div>
      <div className={styles.info}>
        <h5 className={styles.name}>{name}</h5>
        <div className={styles.wrapperAbout}>
          <span className={setMarker()}></span>
          <p className={styles.about}>{info}</p>
        </div>
        <p className={styles.subtitle}>Last known location:</p>
        {/*TODO: исправить ссылку*/}
        <a href={location.url} className={styles.link}>
          {location.name}
        </a>
        <p className={styles.subtitle}>First seen in:</p>
        {/*TODO: вместо ссылки эпизода выводить его название*/}
        <a href={episode[0]} className={styles.link}>
          {episode[0]}
        </a>
      </div>
    </article>
  )
}
export default CharacterCard
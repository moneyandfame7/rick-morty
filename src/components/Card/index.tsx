import * as React from "react"
import { FC } from "react"
import styles from "./Card.module.scss"
interface ICharacterCard {
  info: string
  name: string
  buttonTitle: string
  imageUrl: string
}

const CharacterCard: FC<ICharacterCard> = ({
  info,
  name,
  buttonTitle,
  imageUrl,
}) => {
  const setMarker = () => {
    if (info.includes("Dead")) {
      return styles.redMarker
    } else if (info.includes("Alive")) {
      return styles.greenMarker
    } else {
      return styles.grayMarker
    }
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
      </div>
    </article>
  )
}
export default CharacterCard

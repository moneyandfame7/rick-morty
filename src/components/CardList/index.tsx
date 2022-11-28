import React, { FC } from "react";
import { ICharacter } from "../../interfaces";
import Card from "../Card";
import styles from "./CardList.module.scss";
interface ICardListProps {
  items?: ICharacter[];
}
const CharacterList: FC<ICardListProps> = ({ items }) => {
  return (
    <section className={styles.container}>
      {items?.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </section>
  );
};

export default CharacterList;

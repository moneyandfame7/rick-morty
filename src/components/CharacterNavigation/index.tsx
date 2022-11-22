import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "./CharacterNavigation.module.scss";
import { CharacterContext } from "../../pages/CharacterPage";

const CharacterNavigation: FC = () => {
  const { getResource, prevPage, nextPage, counterPage } = useContext(CharacterContext);

  const handleChangeNext = () => {
    if (nextPage) getResource(nextPage);
  };
  const handleChangePrev = () => {
    if (prevPage) getResource(prevPage);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <Link to={`/character?page=${counterPage && counterPage - 1}`} className={styles.link}>
          <Button title='Previous' onClick={handleChangePrev} disabled={!prevPage} />
        </Link>
        <Link to={`/character?page=${counterPage && counterPage + 1}`} className={styles.link}>
          <Button title='Next' onClick={handleChangeNext} disabled={!nextPage} />
        </Link>
      </div>
    </div>
  );
};

export default CharacterNavigation;

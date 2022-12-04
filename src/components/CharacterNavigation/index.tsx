import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "./CharacterNavigation.module.scss";
import { IEntity } from "../../interfaces";
import { NavigationTypeEnum } from "../../constants/api";

interface INavigationProps<IItem extends IEntity> {
  getResource: (url: string) => Promise<void>;
  prevPage: string | null;
  nextPage: string | null;
  counterPage: number;
  navigationType: NavigationTypeEnum;
}

function Navigation<IItem extends IEntity>({
  getResource,
  prevPage,
  nextPage,
  counterPage,
  navigationType,
}: INavigationProps<IItem>) {
  const handleChangeNext = () => {
    if (nextPage) getResource(nextPage);
  };
  const handleChangePrev = () => {
    if (prevPage) getResource(prevPage);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <Link to={`/${navigationType}?page=${counterPage && counterPage - 1}`} className={styles.link}>
          <Button title='Previous' onClick={handleChangePrev} disabled={!prevPage} />
        </Link>
        <Link to={`/${navigationType}?page=${counterPage && counterPage + 1}`} className={styles.link}>
          <Button title='Next' onClick={handleChangeNext} disabled={!nextPage} />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;

import React, { FC } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

interface ILinkConfig {
  url: string;
  name: string;
  id: number;
}

const LINKS_CONFIG: ILinkConfig[] = [
  {
    url: "/character?page=1",
    name: "Characters",
    id: 0,
  },
  {
    url: "/episode",
    name: "Episodes",
    id: 1,
  },
  {
    url: "/location",
    name: "Locations",
    id: 2,
  },
];

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        {LINKS_CONFIG.map(({ url, name, id }) => (
          <NavLink to={url} key={id}>
            {name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;

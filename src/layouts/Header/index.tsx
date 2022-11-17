import React, { FC } from "react";
import styles from "./Header.module.scss";

interface ILinkConfig {
  url: string;
  name: string;
  id: number;
}

const LINKS_CONFIG: ILinkConfig[] = [
  {
    url: "/character",
    name: "Character",
    id: 0,
  },
  {
    url: "/episode",
    name: "Episode",
    id: 1,
  },
  {
    url: "/location",
    name: "Location",
    id: 2,
  },
];

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        {LINKS_CONFIG.map(({ url, name, id }) => (
          <a className={styles.link} href={url} key={id}>
            {name}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;

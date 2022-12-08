import React, { FC } from "react";
import { useLocation } from "react-router";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage: FC = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1>404</h1>
        <h2>NOT_FOUND_PAGE</h2>
      </div>

      <p className={styles.text}>
        No match for
        <a className={styles.path} href={location.pathname}>
          {location.pathname}
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;

import React from "react";
import styles from "./NotFoundPage.module.scss";
import { useLocation } from "react-router";
const NotFoundPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1>404</h1>
        <h2>NOT_FOUND_PAGE</h2>
      </div>

      <p className={styles.text}>
        No match for{" "}
        <a className={styles.path} href={location.pathname}>
          {location.pathname}
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;

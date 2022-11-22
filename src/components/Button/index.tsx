import React, { FC } from "react";
import styles from "./Button.module.scss";
interface IButtonProps {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: FC<IButtonProps> = ({ title, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;

import React, { FC } from "react"
import styles from "./Wrapper.module.scss"
interface IWrapperProps {
  children?: React.ReactNode
}
const Wrapper: FC<IWrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default Wrapper

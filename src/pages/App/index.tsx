import React, { FC } from "react"
import styles from "./App.module.scss"
import CharacterPage from "../CharacterPage"
import Header from "../../layouts/Header"

const App: FC = () => {
  //TODO: сделать темную и светлую тему
  return (
    <>
      <Header />
      <CharacterPage />
    </>
  )
}

export default App

import React, { FC } from "react"
import styles from "./App.module.scss"
import CharacterPage from "../CharacterPage"
import Header from "../../layouts/Header"

const App: FC = () => {
  //TODO: сделать темную и светлую тему
  // TODO: сделать компонент карточки так, чтобы можно было использовать в любом месте, не только в рик и морти
  // TODO: возможно переписать карточки по другому
  return (
    <>
      <Header />
      <CharacterPage />
    </>
  )
}

export default App

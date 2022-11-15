import React from "react"
import styles from "./App.module.scss"
import CharacterPage from "../CharacterPage"
import Header from "../../layouts/Header"

const App: React.FC = () => {
  return (
    <>
      <Header />
      <CharacterPage />
    </>
  )
}

export default App

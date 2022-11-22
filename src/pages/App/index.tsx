import React, { FC } from "react";
import styles from "./App.module.scss";
import Header from "../../layouts/Header";
import { Routes, Route } from "react-router-dom";
import { routesConfig } from "../../routes/routesConfig";
import Wrapper from "../../layouts/Wrapper";
const App: FC = () => {
  //TODO: сделать темную и светлую тему
  // TODO: делать роуты по локациям, эпизодам
  // TODO: на мокапи сделать отдельный обьект с биографиями для персонажей и делать по ним запросы, + добавить
  //  лоадер или скелетон
  // добавить на всё скелетоны
  // добавить сортировку по категориям
  // https://codesandbox.io/s/rick-and-morty-api-solution-nt75t сделать кнопочку back ( стрелочку мб )
  // записать типизацию хука контекста
  return (
    <>
      <Header />
      <Wrapper>
        <Routes>
          {routesConfig.map(({ path, element, id }) => (
            <Route path={path} element={element} key={id} />
          ))}
        </Routes>
      </Wrapper>
    </>
  );
};

export default App;

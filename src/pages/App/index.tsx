import React, { FC } from "react";
import Header from "../../layouts/Header";
import { Routes, Route } from "react-router-dom";
import { routesConfig } from "../../routes/routesConfig";
import Wrapper from "../../layouts/Wrapper";
const App: FC = () => {
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

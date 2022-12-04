import React from "react";
import Header from "../../layouts/Header";
import { createBrowserRouter } from "react-router-dom";
import { routesConfig } from "../../routes/routesConfig";
import Wrapper from "../../layouts/Wrapper";
import { useLocation, useOutlet } from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.scss";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesConfig.map(route => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);
function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } = routesConfig.find(route => route.path === location.pathname) ?? {};
  return (
    <>
      <Header />
      <Wrapper>
        <SwitchTransition>
          <CSSTransition key={location.pathname} nodeRef={nodeRef} timeout={300} classNames='page' unmountOnExit>
            {() => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Wrapper>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";



function App() {


  return (
    <>
     
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

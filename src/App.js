import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";

// test useContext
import { TestContext } from "./hooks/TestContext";

function App() {

  const [user, setUser] = useState({
    email: 'donnie.lee@pospot.kr',
    name : 'donnie',
    other : 'female'
  })
  return (
    <>
    <TestContext.Provider value={user}>
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
      </TestContext.Provider>
    </>
  );
}

export default App;

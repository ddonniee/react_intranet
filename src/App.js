import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import routes from "./routes";
import './scss/style.scss';

// test useContext
import { TestContext } from "./hooks/TestContext";

function App() {


 

  const [user, setUser] = useState({
    email: 'donnie.lee@pospot.kr',
    name : 'donnie',
    other : 'female'
  })

  let loginCheck = 1;

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/Android/i)) {
      // 안드로이드 기기에 대한 스타일을 적용하는 로직
      console.log('Android')
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      // iOS 기기에 대한 스타일을 적용하는 로직
      console.log('Android')
    } else if (userAgent.match(/Windows/i)) {
      // Windows 기기에 대한 스타일을 적용하는 로직
      console.log('Windows')
    } else if (userAgent.match(/Mac/i)) {
      // Mac 기기에 대한 스타일을 적용하는 로직
      console.log('Mac')
    } else {
      // 기타 기기에 대한 스타일을 적용하는 로직
      console.log('else')
    }

  }, []);

 
 
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

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import routes from "./routes";
// import './scss/style.scss';
// import './m_scss/style.scss';

import {detectUserAgent} from '../src/utils/CommonFunction'
// test useContext
import { TestContext } from "./hooks/TestContext";

function App({isMobile}) {

  const [user, setUser] = useState({
    email: 'donnie.lee@pospot.kr',
    name : 'donnie',
    other : 'female'
  })

  let loginCheck = 1;

  useEffect(() => {
    if (isMobile) {
      import('./m_scss/style.scss');
    } else {
      import('./scss/style.scss');
    }

    return () => {
      // 컴포넌트가 언마운트될 때 CSS 파일 제거
      const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach((element) => {
        if (element.href.includes('mobile.css') || element.href.includes('pc.css')) {
          element.remove();
        }
      });
    };
  }, [isMobile]);
 
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

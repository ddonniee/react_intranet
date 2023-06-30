import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import routes from "./routes";
// import './scss/style.scss';
// import './m_scss/style.scss';

import {detectUserAgent} from '../src/utils/CommonFunction'
// test useContext
import { UserContext } from "./hooks/UserContext";

function App({isMobile}) {

  const [user, setUser] = useState({
    id: 'ID_LK',
    name : 'LGEKR 본사스태프(한국고객가치혁실ㄴ)',
    role : 'LK',
    branch :  "LGEAI_BRANCH_7650T",
    center :  "LGEAI009062C",
    subsidiary : "LGEKR",
    // token : sessionStorage.getItem('UserInfo'); // 직급에 따라 토큰 값 받아오기
    // id: 'ID_SA',
    // name : '법인 Admin',
    // role : 'SA',
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
      const linkElements = document.querySelectorAll('link[rel="styleshe et"]');
      linkElements.forEach((element) => {
        if (element.href.includes('mobile.css') || element.href.includes('pc.css')) {
          element.remove();
        }
      });
    };
  }, [isMobile]);
 
  return (
    <>
    <UserContext.Provider value={user}>
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
      </UserContext.Provider>
    </>
  );
}

export default App;

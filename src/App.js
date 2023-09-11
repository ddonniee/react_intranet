import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import routes from "./routes";
import NotFound from "./views/Pages/NotFound";

// test useContext
import { UserContext } from "./hooks/UserContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tab from "./components/Tab";

function App({}) {

  // 모바일로 화면 분기시에 활성화
  // function App({isMobile}) {
    
  const [user, setUser] = useState({
    id: 'donnie_lee',
    name : 'donnie',
    role : 'front-developer',
    eMail :  "m__ma@naver.com",
  })

  
  // 모바일로 화면 분기시에 활성화
  // useEffect(() => {
  //   if (isMobile) {
  //     import('./m_scss/style.scss');
  //   } else {
  //     import('./scss/style.scss');
  //   }

  //   return () => {
  //     // 컴포넌트가 언마운트될 때 CSS 파일 제거
  //     const linkElements = document.querySelectorAll('link[rel="styleshe et"]');
  //     linkElements.forEach((element) => {
  //       if (element.href.includes('mobile.css') || element.href.includes('pc.css')) {
  //         element.remove();
  //       }
  //     });
  //   };
  // }, [isMobile]);
 
  return (
    <>
    <UserContext.Provider value={user}>
      <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
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
           <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

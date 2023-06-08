import React, { useState } from "react";
import Pagination from "react-js-pagination";

import '../scss/style.scss';

const Paging = ({page, perPage, count, setPage}) => {

  /* 호출 시 사용 예
  const [activePage, setActivePage] = useState(1); // 현재 페이지
  const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수

  const setPage = (e) => {
      setActivePage(e);
      gridRef.current.api.paginationGoToPage(e); // AgGrid 사용 시 추가
  };
  */

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={perPage} // 한 페이지 당 보여줄 아이템 수
      totalItemsCount={count} // 총 아이템 수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={setPage} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;
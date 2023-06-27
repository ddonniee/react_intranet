import React, { useState } from "react";
import Pagination from "react-js-pagination";

import '../scss/style.scss';

const Paging = ({ pageInfo, setPageInfo, searchData, setSearchData }) => {

  /* 호출 시 사용 예

  const [pageInfo, setPageInfo] = useState({
        activePage: 1,     // 현재 페이지
        itemsPerPage: 10,  // 페이지 당 아이템 갯수
        totalCount: 0      // 전체 목록 수
  });

  const [searchData, setSearchData] = useState({
        page: 1,
  });

  <Paging pageInfo={pageInfo} setPageInfo={setPageInfo} searchData={searchData} setSearchData={setSearchData} />
  */

  const setPage = (page) => {
      setPageInfo({ ...pageInfo, activePage: page });
      setSearchData({ ...searchData, page: page });

      console.log('page ---->', page);
  }

  return (
    pageInfo &&
    <Pagination
      activePage={pageInfo?.activePage} // 현재 페이지
      itemsCountPerPage={pageInfo?.itemsPerPage} // 한 페이지 당 보여줄 아이템 수
      totalItemsCount={pageInfo?.totalCount} // 총 아이템 수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={setPage} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;
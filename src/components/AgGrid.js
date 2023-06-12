import React, { useState, useRef, useEffect, useMemo, useCallback, useLayoutEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Pagination from "react-js-pagination";

import '../scss/style.scss';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';

/**
 *  작성자 : 원은정
 *  작성일 : 2023.06.05
 *  기능 : 테이블 그리드 생성
 * @param {
 * data : 행 데이터
 * column : 컬럼명
 * paging : 페이징 여부 true/false
 * }
 * @returns
*/
const AgGrid = ({data, column, paging}) => {
    
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [columnDefs, setColumnDefs] = useState();

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수

    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
        gridRef.current.api.paginationGoToPage(e);
    };
    /** 페이징 관련 ▲ ============================================================= */

    // 데이터, 컬럼명 설정
    useLayoutEffect(() => {
        setRowData(data)
        setColumnDefs(column)
        // setColumnDefs(column.map(col => ({
        //     field: col, filter: true
        // })))
    }, [data]);

    const onGridReady = useCallback((params) => {
        // setRowData(data)
        // setColumnDefs(column)
        // gridRef.current.api.sizeColumnsToFit();
    }, []);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(()=> ({
        editable: false,
        sortable: true,
        // resizable: false,
        // filter: false,
        flex: 1,
    }));

    // Example > 그리드 클릭 시 row값 콘솔 출력
    const cellClickedListener = useCallback( e => {
        console.log('cellClicked', e.data);
    }, []);

    // Example > 선택한 row 해제
    const buttonListener = useCallback( e => {
        gridRef.current.api.deselectAll();
    }, []);

    const sizeToFit = useCallback(() => {
        gridRef.current.api.sizeColumnsToFit();
      }, []);

    return (
        <div>
          {
            data && (
            <>
            {/* ag-grid */} 
            <div className="ag-theme-alpine">
                <AgGridReact 
                    ref={gridRef} // Ref for accessing Grid's API 
                    rowData={rowData} // Row Data for Rows 
                    columnDefs={columnDefs} // Column Defs for Columns 
                    defaultColDef={defaultColDef} // Default Column Properties 
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    // rowSelection='multiple' // Options - allows click selection of rows 
                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event 
                    pagination={paging ? true : false}
                    paginationPageSize={10}
                    suppressPaginationPanel={true}
                    suppressScrollOnNewData={true}
                    onGridReady={onGridReady}
                />
            </div>
            {/* react-js-pagination */}
            {paging ?
            <Pagination
                activePage={activePage} // 현재 페이지
                itemsCountPerPage={itemsPerPage} // 한 페이지 당 보여줄 아이템 수
                totalItemsCount={data?.length} // 총 아이템 수
                pageRangeDisplayed={5} // paginator의 페이지 범위
                prevPageText={"‹"} // "이전"을 나타낼 텍스트
                nextPageText={"›"} // "다음"을 나타낼 텍스트
                onChange={setPage} // 페이지 변경을 핸들링하는 함수
            />
            : null
            }
            </>
          )}
        </div>
      );
};

export default AgGrid;
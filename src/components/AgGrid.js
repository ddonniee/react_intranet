import React, { useState, useRef, useEffect, useMemo, useCallback, useLayoutEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Pagination from "react-js-pagination";

import $ from 'jquery';

import '../scss/style.scss';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community';

/**
 *  작성자 : 이은정
 *  작성일 : 2023.09.06
 *  기능 : 테이블 그리드 생성
 * @param {
 * data : 행 데이터
 * column : 컬럼명
 * paging : 페이징 여부 true/false
 * }
 * @returns
*/
const AgGrid = ({data, column, paging, checkbox, checkedItems, changeValue, isModify, multiple}) => {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [columnDefs, setColumnDefs] = useState(column);
    const [isMultiple, setIsMultiple] = useState(multiple); // row 다중선택여부

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수
    const [isCheckBox, setIsCheckbox] = useState(checkbox); // check box 사용할 시 cell click 막기

    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
        gridRef.current.api.paginationGoToPage(e);
    };
    /** 페이징 관련 ▲ ============================================================= */

    /** Checkbox 관련 ▲ ============================================================= */
    const [checkedList, setCheckedList] = useState([]);
    /** Checkbox 관련 ▲ ============================================================= */

    // 데이터, 컬럼명 설정
    useLayoutEffect(() => {
        setRowData(data)
        setColumnDefs(column)
        
        if(isModify) {
            setColumnDefs((prevCol) =>
                prevCol.map((col) => {
                    return {...col, editable: true};
                })
            )
        } else {
            setColumnDefs((prevCol) =>
                prevCol.map((col) => {
                    return {...col, editable: false};
                })
            )
        }
    }, [data, isModify]);

    
  useEffect(() => {
    setRowData(data);
    
    const updatedColumns = column.map((col) => ({
      ...col,
      editable: col.editable ? true : false
    }));
    
    setColumnDefs(updatedColumns);
  }, [data, column]);
  

    const onGridReady = useCallback((params) => {
        setRowData(data)
        setColumnDefs(column)
        gridRef.current.api.sizeColumnsToFit();
    }, []);

    const defaultColDef = useMemo(()=> ({
        editable: false,
        sortable: true,
        // resizable: true,
        // filter: false,
        flex: 1,
        
    }));

    // Example > 그리드 클릭 시 row값 콘솔 출력
    // const cellClickedListener = useCallback( e => {
    //     console.log('cellClicked', e);
    // }, []);

    const cellClickedListener =  e => {
        let selectedData=e.data;
        checkedItems && checkedItems(selectedData);
        data && changeValue(data)
        // const selectedNodes = e.api.getSelectedNodes();
        // const selectedData = selectedNodes.map((node) => node.data);
    }; 
    // 그리드 기본 높이 컨텐츠 길이에 맞게 동적으로 설정
    /*
        개별적인 높이 고정(px)이 필요할 경우 화면별 css에 추가
        .ag-theme-alpine {    
            height: 267px !important;
        }
    */
    useEffect(() => {
        calculateGridHeight();
        window.addEventListener('resize', calculateGridHeight);
        return () => {
            window.removeEventListener('resize', calculateGridHeight);
        };
    }, []);

    const calculateGridHeight = () => {
        // const contentHeight = (data?.length + 1.65) * 44; // 행 높이 승수 조정 (한 행의 높이 42px)
        const contentHeight = (data?.length + 1) * 44;
        const gridContainer = document.querySelector('.ag-theme-alpine');
        if (gridContainer) {
            gridContainer.style.height = `${contentHeight}px`; // calc(100% + 17px);
        }
    };

    const handleSelectBox = useCallback((event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        
        checkedItems(selectedData);
      }, [checkedItems]);

      const handleCellValueChanged = params =>{
      
        const {data} = params;
        console.log(params,'ehandleCellValueChanged')
        // changeValue((prev=>prev.map(item=>item.'id===data.id ? data:item)))
      }
    
    useEffect(()=>{
        if(checkbox) {
            setIsCheckbox(true)
        }else if(!checkbox) {
            setIsCheckbox(false)
        }
    },[])

  
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
                    rowSelection={isMultiple ? 'multiple' : 'single'} // Options - allows click selection of rows 
                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event 
                    pagination={paging ? true : false}
                    paginationPageSize={10}
                    suppressPaginationPanel={true}
                    suppressScrollOnNewData={true}
                    suppressRowClickSelection={true}
                    suppressRowTransform={true}
                    suppressClickEdit={false}
                    onGridReady={onGridReady}
                    onSelectionChanged={handleSelectBox}
                    suppressCellFocus={isModify ? false : true}
                    onCellValueChanged={handleCellValueChanged}
                    // editType="fullRow"
                    // singleClickEdit={true}
                    
                    
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

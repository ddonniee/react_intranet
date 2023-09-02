// import { useContext, useState, useEffect, useLayoutEffect } from 'react';

// import Header from "../../components/Header"
// import Top from "../../components/Top"
// import Zendesk from "../../components/Zendesk"
// import Tab from '../../components/Tab';
// import LineChart from "../../components/Chart";
// import AgGrid from "../../components/AgGrid";
// import SelectBox from '../../components/SelectBox';

// import { generateRandomString } from "../../utils/CommonFunction"
// import { UserContext } from "../../hooks/UserContext";

// import '../../scss/style.scss';
// import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_search.svg';
// import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';
// import { ReactComponent as ExcelIcon } from '../../assets/svgs/icon_excel.svg';

// function KpiPerformance() {

//     /**
//      * 화면 접근 권한
//      * 
//      * - Subsidiary 조회
//      * 본사 staff    (LK)  : 법인 선택 가능
//      * 법인관리자    (SS)  : 소속 법인 고정 (선택불가)
//      * 법인 admin    (SA)  : N/A
//      * LGC 관리자    (LD)  : 소속 법인 고정 (선택불가)
//      * LGC Engineer  (LE)  : 소속 법인 고정 (선택불가)
//      * ASC 관리자    (AD)  : 소속 법인 고정 (선택불가)
//      * ASC Engineer  (AE)  : 소속 법인 고정 (선택불가)
//      * 
//      * - Center Type 조회
//      * 본사 staff    (LK)  : LGC/ASC 선택 가능
//      * 법인관리자    (SS)  : LGC/ASC 선택 가능
//      * 법인 admin    (SA)  : N/A
//      * LGC 관리자    (LD)  : LGC 고정
//      * LGC Engineer  (LE)  : LGC 고정
//      * ASC 관리자    (AD)  : ASC 고정
//      * ASC Engineer  (AE)  : ASC 고정
//      * 
//      * - KPI 표 Total(차트)
//      * 본사 staff    (LK)  : 법인별 / Center / Branch 합계 내용
//      * 법인관리자    (SS)  : 소속 법인 / Center / Branch 합계 내용
//      * 법인 admin    (SA)  : N/A
//      * LGC 관리자    (LD)  : 소속 센터 합계 내용
//      * LGC Engineer  (LE)  : 본인 내용
//      * ASC 관리자    (AD)  : 소속 센터 합계 내용
//      * ASC Engineer  (AE)  : 본인 내용
//      * 
//      * - KPI 표 Detail
//      * 본사 staff    (LK)  : Center / Branch별 내용
//      * 법인관리자    (SS)  : Center / Branch별 내용
//      * 법인 admin    (SA)  : N/A
//      * LGC 관리자    (LD)  : 수리기사별로 표시
//      * LGC Engineer  (LE)  : N/A
//      * ASC 관리자    (AD)  : Branch / 수리기사별로 표시
//      * ASC Engineer  (AE)  : N/A
//      */

//     // 로그인 유저 정보
//     const user = useContext(UserContext);
//     const [token, setToken] = useState('LGEKR');
//     const [auth, setAuth] = useState({
//         isViewer : user.role === 'LK' || user.role === 'SA' ? true : false,
//         isWriter : user.role === 'SA' ? true : false,
//         isStaff : user.role === 'LK' ? true : false,
//     })

//     useEffect(() => {
//         console.log('login user', user)

//         if(!auth.isViewer) {
//             alert('No right to Access')
//             document.location.href='/login';
//         }
//     }, [])

//     const USER_CORP_CODE = 'LGEAI' // 로그인유저 법인코드
//     const USER_CENTER_TYPE = 'ASC' // 로그인유저 센터타입

//     const config = { // axios header
//         maxBodyLength: Infinity,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             // 'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
//             'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
//         }
//     }

//     /* 검색 영역 ****************************************************************/
//     const [searchData, setSearchData] = useState({ // 검색데이터
//         page: 1,
//         type: 'S',
//     });

//     const subOptions = [ // 법인 selectbox 데이터
//         { value: 'LGEAI', label: 'LGEAI', group: 'corporationCode' },
//     ]
//     const centerOptions = [ // center type selectbox 데이터
//         { value: 'LGC', label: 'LGC', group: 'centerType' },
//         { value: 'ASC', label: 'ASC', group: 'centerType' },
//     ]
//     const branchOptions = [
//         { value: 'NW', label: 'NW' },
//         { value: 'NW2', label: 'NW2' },
//     ]
//     const divOptions = [
//         { value: 'ASC', label: 'ASC' },
//         { value: 'ASC2', label: 'ASC2' },
//     ]
//     const prodOptions = [
//         { value: 'NW', label: 'NW' },
//         { value: 'NW2', label: 'NW2' },
//     ]

//     const handleSelectBox = (e) => {
//         console.log('select ---->', e)
//         let group = e.group;
//         let value = e.value;

//         if(group === 'corporationCode') {
//             setSearchData({ ...searchData, subsidiary: value })
//         } else if(group === 'centerType') {
//             setSearchData({ ...searchData, view: value })
//         }
//     }

//     /* 컨텐츠 영역 ****************************************************************/
//     const [rowData, setRowData] = useState([ // 테이블 데이터 설정
//         {
//             center: 'Total',
//             kpi: 'Volume(C)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'Total',
//             kpi: 'Reclaim (%)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'Total',
//             kpi: 'RTAT (D)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'Total',
//             kpi: 'Repair NPS (P)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'Total',
//             kpi: 'LPR (%) > 7D',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'Total',
//             kpi: 'LT',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #1',
//             kpi: 'Volume(C)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #1',
//             kpi: 'Reclaim (%)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #1',
//             kpi: 'RTAT (D)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #1',
//             kpi: 'Repair NPS (P)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #1',
//             kpi: 'LPR (%) > 7D',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #1',
//             kpi: 'LT',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #2',
//             kpi: 'Volume(C)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #2',
//             kpi: 'Reclaim (%)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #2',
//             kpi: 'RTAT (D)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #2',
//             kpi: 'Repair NPS (P)',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #2',
//             kpi: 'LPR (%) > 7D',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//         {
//             center: 'ASC #2',
//             kpi: 'LT',
//             lastYear: '100.1', 
//             lastYear2Mon: '100.1',
//             target: '100.1',
//             thisYear2Mon: '100.1',
//             ach: '100.1',
//             yoyYear: '100.1',
//             yoyMon: '100.1',
//             lastMonth3: '100.1',
//             lastMonth2: '100.1',
//             lastMonth1: '100.1',
//             thisMonth: '100.1',
//             w04: '100.1',
//             w05: '100.1',
//             w06: '100.1',
//             thisWeek: '100.1'
//         },
//     ]);

//     const rowSpan = (params) => {
//         let center = params.data ? params.data.center : undefined;
//         // console.log('center --->', center)
//         if (center === 'Total' || center === 'ASC #1' || center === 'ASC #2') {
//           return 4;
//         } else {
//           return 1;
//         }
//     };

//     const [column, setColumn] = useState([ // 컬럼 값 설정
//         {
//             headerName: '',
//             field: 'center',
//             spanHeaderHeight: true,
//             pinned: 'left',
//             width: 60,
//             rowSpan: rowSpan,
//             cellClassRules: {
//                 'cell-span': " value==='Total' || value==='ASC #1' || value==='ASC #2' ",
//             },
//         },
//         { 
//             headerName: 'KPI',
//             field: 'kpi',
//             resizable: false,
//             spanHeaderHeight: true,
//             pinned: 'left',
//             width: 140,
//             // suppressAutoSize: true
//         },
//         {
//             headerName: '2022',
//             children: [
//                 {
//                     headerName: '∑ 2022',
//                     field : '2022',
//                     resizable: false,
//                     headerClass: '2022',
//                     width: 100
//                 },
//                 {
//                     headerName: '01-02',
//                     field : '01-02',
//                     resizable: false,
//                     headerClass: '2022',
//                     width: 100
//                 }
//             ]
//         },
//         {
//             headerName: '2023',
//             children: [
//                 {
//                     headerName: 'Target',
//                     field : 'target',
//                     resizable: false,
//                     headerClass: '2023',
//                     width: 100
//                 },
//                 {
//                     headerName: '01-02',
//                     field : '01-02',
//                     resizable: false,
//                     headerClass: '2023',
//                     width: 100
//                 },
//                 {
//                     headerName: 'Ach.(%)',
//                     field : 'ach',
//                     resizable: false,
//                     headerClass: '2023',
//                     width: 100
//                 }
//             ]
//         },
//         {
//             headerName: `YOY \n(year)`,
//             field: 'yoyYear',
//             resizable: false,
//             spanHeaderHeight: true,
//             wrapHeaderText: true,
//             width: 100
//         },
//         {
//             headerName: `YOY \n(Acc. Mon)`,
//             field: 'yoyMon',
//             resizable: false,
//             spanHeaderHeight: true,
//             wrapHeaderText: true,
//             width: 100
//         },
//         {
//             headerName: 'Last 3 Months',
//             children: [
//                 {
//                     headerName: '2022 Nov',
//                     field : '202212',
//                     resizable: false,
//                     headerClass: 'Last 3 Months',
//                     width: 100
//                 },
//                 {
//                     headerName: '2022 Dec',
//                     field : '202301',
//                     resizable: false,
//                     headerClass: 'Last 3 Months',
//                     width: 100
//                 },
//                 {
//                     headerName: '2023 Jan',
//                     field : '202302',
//                     resizable: false,
//                     headerClass: 'Last 3 Months',
//                     width: 100
//                 }
//             ]
//         },
//         { 
//             headerName: 'This Month',
//             field: 'thisMonth',
//             resizable: false,
//             spanHeaderHeight: true,
//             wrapHeaderText: true,
//         },
//         {
//             headerName: 'Last 3 Weeks',
//             children: [
//                 {
//                     headerName: 'W03',
//                     field : 'w04',
//                     resizable: false,
//                     headerClass: 'Last 3 Weeks',
//                     width: 100
//                 },
//                 {
//                     headerName: 'W04',
//                     field : 'w05',
//                     resizable: false,
//                     headerClass: 'Last 3 Weeks',
//                     width: 100
//                 },
//                 {
//                     headerName: 'W05',
//                     field : 'w06',
//                     resizable: false,
//                     headerClass: 'Last 3 Weeks',
//                     width: 100
//                 }
//             ]
//         },
//         { 
//             headerName: 'This Week',
//             field: 'thisWeek',
//             resizable: false,
//             spanHeaderHeight: true,
//             wrapHeaderText: true,
//         },
//     ]);

//     const [activeTab, setActiveTab] = useState(0);

//     const handleTabClick = (index) => {
//         setActiveTab(index);
//     };

//     const renderTabs = () => {
//         return tabData.map((tab, index) => (
//         <div
//             key={index}
//             className={`tab ${index === activeTab ? 'active' : ''}`}
//             onClick={() => handleTabClick(index)}
//         >
//             {tab.title}
//         </div>
//         ));
//     };

//     const renderContent = () => {
//         return tabData[activeTab].content;
//     };

//     const renderTable = (data, isDetail) => { 
//         // Get the column names from the first object
//         const columns = Object.keys(data[0]);   
      
//         return (
//           <table className='table-wrapper'>
//             <thead>
//                 <tr>
//                     { isDetail ? <th className='custom-th custom-th-rowspan' rowspan="2">{'Employee ID'}</th> : null}
//                     <th className='custom-th custom-th-rowspan' colSpan={isDetail ? 1 : 2} rowspan="2">KPI</th>
//                     <th className='custom-th' colspan="2">2022</th>
//                     <th className='custom-th' colspan="3">2023</th>
//                     <th className='custom-th custom-th-rowspan' rowSpan="2">YOY(year)</th>
//                     <th className='custom-th custom-th-rowspan' rowSpan="2">YOY(ACC. Mon)</th>
//                     <th className='custom-th' colspan="3">Last 3 Month</th>
//                     <th className='custom-th custom-th-rowspan' rowSpan="2">This Month</th>
//                     <th className='custom-th' colspan="3">Last 3 Weeks</th>
//                     <th className='custom-th custom-th-rowspan' rowSpan="2">This Week</th>
//                 </tr>
//                 <tr>
//                     <th className='custom-th'>2022</th>
//                     <th className='custom-th'>01-02</th>
//                     <th className='custom-th'>Target</th>
//                     <th className='custom-th'>01-02</th>
//                     <th className='custom-th'>Ach</th>
//                     <th className='custom-th'>2022 Nov</th>
//                     <th className='custom-th'>2022 Dec</th>
//                     <th className='custom-th'>2023 Jan</th>
//                     <th className='custom-th'>W03</th>
//                     <th className='custom-th'>W04</th>
//                     <th className='custom-th' style={{borderRight: "1px solid #D5D5D5"}}>W05</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 { data.map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                         {/* <td id={`${row}-${rowIndex}`} className='custom-td custom-td-center' rowSpan="4">{ row.center }</td>
//                         <td id={`${row}-${rowIndex}`} className={`custom-td`}>{ row.kpi }</td> */}
//                     { columns.map((col, colIndex) => {
//                         if(col === 'center' && rowIndex % 6 === 0) {
//                             return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className='custom-td custom-td-center' rowSpan="6">{ row[col] }</td>;
//                         } else if(col === 'center' && rowIndex % 6 !== 0) {
//                             return false;
//                         } else if(col === 'kpi') {
//                             return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className={`custom-td custom-td-status`}>{ row[col] }</td>
//                         }
//                         // return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className={`custom-td ${colIndex === 1 ? 'custom-td-status' : ''}`}>{ row[col] }</td>;
//                     }) }
//                         <td className='custom-td'>{ row.lastYear }</td>
//                         <td className='custom-td'>{ row.lastYear2Mon }</td>
//                         <td className='custom-td'>{ row.target }</td>
//                         <td className='custom-td'>{ row.thisYear2Mon }</td>
//                         <td className='custom-td'>{ row.ach }</td>
//                         <td className='custom-td'>{ row.yoyYear }</td>
//                         <td className='custom-td'>{ row.yoyMon }</td>
//                         <td className='custom-td'>{ row.lastMonth3 }</td>
//                         <td className='custom-td'>{ row.lastMonth2 }</td>
//                         <td className='custom-td'>{ row.lastMonth1 }</td>
//                         <td className='custom-td'>{ row.thisMonth }</td>
//                         <td className='custom-td'>{ row.w04 }</td>
//                         <td className='custom-td'>{ row.w05 }</td>
//                         <td className='custom-td'>{ row.w06 }</td>
//                         <td className='custom-td'>{ row.thisWeek }</td>
//                     </tr>
//                 )) }
                
//                 {/* { data.map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                     { columns.map((col, colIndex) => {
//                         if(colIndex === 0 && rowIndex % 4 === 0) {
//                             return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className='custom-td custom-td-center' rowSpan="4">{ row[col] }</td>;
//                         } else if(colIndex === 0 && rowIndex % 4 !== 0) {
//                             return false;
//                         }
//                         return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className={`custom-td ${colIndex === 1 ? 'custom-td-status' : ''}`}>{ row[col] }</td>;
//                     }) }
//                     </tr>
//                 )) } */}
//             </tbody>
//           </table>
//         );
//     };

//     const tabData = [
//         {
//           title: 'Summary',
//           content: <>
//             <div className="chart"> 
//                 <LineChart />
//             </div>
//             <div className="table"> 
//                 <div className='title'>
//                     <button className='excel'>
//                         <ExcelIcon />
//                         <p>Excel</p>
//                     </button>
//                 </div>
//                 {/* <div className='grid'>
//                     <AgGrid data={rowData} column={column} paging={false} />
//                 </div> */}
//                 {renderTable(rowData, false)}
//             </div>
//           </>,
//         },
//         {
//           title: 'Detail',
//           content: 
//             <div className="table"> 
//                 <div className='title'>
//                     <button className='excel'>
//                         <ExcelIcon />
//                         <p>Excel</p>
//                     </button>
//                 </div>
//                 {/* <div className='grid'>
//                     <AgGrid data={rowData} column={column} paging={false} />
//                 </div> */}
//                 {renderTable(rowData, true)}
//             </div>
//         }
//     ];

//     return (
//        <div className='kpi-container'>
//        <Header />
//         <div className="inner-container">
//             {/** auth 권한체크로 수정 필요 */}
//             <Top auth={1} searchArea={false}/>
//             {/** Search Nav */}
//             <div className='kpi-nav'>
//                 <div className='nav-left'>
//                     <div className='search'>
//                         <SearchIcon />
//                         <p>Search</p>
//                     </div>
//                     <div className='nav-line'></div>
//                 </div>
//                 <div className='nav-center'>
//                     <div className='nav-box'>
//                         <div className='nav-search'>
//                             <p>· Subsidiary</p> <SelectBox options={subOptions} onChange={handleSelectBox} defaultValue={subOptions[0]} />
//                         </div>
//                         <div className='nav-search'>
//                             <p>· Division</p> <SelectBox options={divOptions} onChange={handleSelectBox} placeholder="Select" />
//                         </div>
//                     </div>
//                     <div className='nav-box'>
//                         <div className='nav-search'>
//                             <p>· Center</p> <SelectBox options={centerOptions} onChange={handleSelectBox} placeholder="Select" />
//                         </div>
//                         <div className='nav-search'>
//                             <p>· Product</p> <SelectBox options={prodOptions} onChange={handleSelectBox} placeholder="Select" />
//                         </div>
//                     </div>
//                     <div className='nav-box'>
//                         <div className='nav-search'>
//                             <p>· Branch</p> <SelectBox options={branchOptions} onChange={handleSelectBox} placeholder="Select" />
//                         </div>
//                         <div className='nav-search' style={{visibility: "hidden"}}>
//                             <p>· Branch</p> <SelectBox options={subOptions} onChange={handleSelectBox} placeholder="Select" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='nav-right'>
//                     <div className='nav-line'></div>
//                     <button className='circle'>
//                         <p>Inquiry</p>
//                         <IntersectIcon />
//                     </button>
//                 </div>
//             </div>
            
//             {/** Summary */}
//             <div className="tab-menu">{ renderTabs() }</div>
//             <div className="kpi-value">{ renderContent() }</div>
//             <Zendesk />
//         </div>
//         <Tab />
//         </div>
//     )
// }

// export default KpiPerformance

function KpiPerformance() {
    return(
        <div>
            KpiPerformance
        </div>
    )
}

export default KpiPerformance
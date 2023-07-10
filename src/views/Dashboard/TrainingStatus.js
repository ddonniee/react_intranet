import { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import Tab from '../../components/Tab';

import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import SelectBox from '../../components/SelectBox';
import CustomDatePicker from '../../components/DatePicker';

import '../../scss/style.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_search.svg';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';
import { ReactComponent as ExcelIcon } from '../../assets/svgs/icon_excel.svg';

function TrainingStatus() {

    const [rowData, setRowData] = useState([ // 테이블 데이터 설정
        {
            center: 'ASC #1',
            status: 'In Progress',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #1',
            status: 'Completed (OK)',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #1',
            status: 'Completed (Fail)',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #2',
            status: 'In Progress',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #2',
            status: 'Completed (OK)',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #2',
            status: 'Completed (Fail)',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #3',
            status: 'In Progress',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #3',
            status: 'Completed (OK)',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
            center: 'ASC #3',
            status: 'Completed (Fail)',
            month1: '1', 
            month2: '1',
            month3: '1',
            month4: '1',
            month5: '1',
            month6: '1',
            month7: '1',
            month8: '1',
            month9: '1',
            month10: '1',
            month11: '1',
            month12: '1',
        },
        {
          center: 'ASC #4',
          status: 'In Progress',
          month1: '1', 
          month2: '1',
          month3: '1',
          month4: '1',
          month5: '1',
          month6: '1',
          month7: '1',
          month8: '1',
          month9: '1',
          month10: '1',
          month11: '1',
          month12: '1',
      },
      {
          center: 'ASC #4',
          status: 'Completed (OK)',
          month1: '1', 
          month2: '1',
          month3: '1',
          month4: '1',
          month5: '1',
          month6: '1',
          month7: '1',
          month8: '1',
          month9: '1',
          month10: '1',
          month11: '1',
          month12: '1',
      },
      {
          center: 'ASC #4',
          status: 'Completed (Fail)',
          month1: '1', 
          month2: '1',
          month3: '1',
          month4: '1',
          month5: '1',
          month6: '1',
          month7: '1',
          month8: '1',
          month9: '1',
          month10: '1',
          month11: '1',
          month12: '1',
      },
      {
        center: 'ASC #5',
        status: 'In Progress',
        month1: '1', 
        month2: '1',
        month3: '1',
        month4: '1',
        month5: '1',
        month6: '1',
        month7: '1',
        month8: '1',
        month9: '1',
        month10: '1',
        month11: '1',
        month12: '1',
    },
    {
        center: 'ASC #5',
        status: 'Completed (OK)',
        month1: '1', 
        month2: '1',
        month3: '1',
        month4: '1',
        month5: '1',
        month6: '1',
        month7: '1',
        month8: '1',
        month9: '1',
        month10: '1',
        month11: '1',
        month12: '1',
    },
    {
        center: 'ASC #5',
        status: 'Completed (Fail)',
        month1: '1', 
        month2: '1',
        month3: '1',
        month4: '1',
        month5: '1',
        month6: '1',
        month7: '1',
        month8: '1',
        month9: '1',
        month10: '1',
        month11: '1',
        month12: '1',
    },
    ]);

    const rowSpan = (params) => {
        let center = params.data ? params.data.center : undefined;
        // console.log('center --->', center)
        return 3;

        // if (center === 'ASC #1' || center === 'ASC #2' || center === 'ASC #3') {
        //   return 3;
        // } else {
        //   return 1;
        // }
    };

    const [column, setColumn] = useState([ // 컬럼 값 설정
        {
            headerName: '',
            field: 'center',
            spanHeaderHeight: true,
            pinned: 'left',
            width: 60,
            rowSpan: rowSpan,
            cellClassRules: {
                'cell-span': " value==='ASC #1' || value==='ASC #2' || value==='ASC #3' ",
            },
        },
        { 
            headerName: 'Training Status',
            field: 'trainingStatus',
            resizable: false,
            spanHeaderHeight: true,
            pinned: 'left',
            width: 220,
            // suppressAutoSize: true
        },
        { 
            headerName: 'May-2023',
            field: 'month1',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month2',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month3',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month4',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month5',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month6',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month7',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month8',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month9',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month10',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month11',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        { 
            headerName: 'May-2023',
            field: 'month12',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
    ]);

    const subOptions = [
        { value: 'LGEAI', label: 'LGEAI' },
        { value: 'LGEAI2', label: 'LGEAI2' },
    ]

    const centerOptions = [
        { value: 'ASC', label: 'ASC' },
        { value: 'ASC2', label: 'ASC2' },
    ]

    const branchOptions = [
        { value: 'NW', label: 'NW' },
        { value: 'NW2', label: 'NW2' },
    ]

    const divOptions = [
        { value: 'ASC', label: 'ASC' },
        { value: 'ASC2', label: 'ASC2' },
    ]

    const prodOptions = [
        { value: 'NW', label: 'NW' },
        { value: 'NW2', label: 'NW2' },
    ]

    const handleSelectBox = (event,params) => {
        const { data } = params.node;
        const { checked } = event.target;

        if (checked) {
            setRowData([...rowData, data]);
          } else {
            setRowData(rowData.filter(item => item !== data));
          }
    }

    const [activeTab, setActiveTab] = useState(0);
    const [activeLowerTab, setActiveLowerTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const renderTabs = () => {
        return tabData.map((tab, index) => (
        <div
            key={index}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
        >
            {tab.title}
        </div>
        ));
    };

    const renderContent = () => {
        return tabData[activeTab].content;
    };

    /*========================================================================= */
    const renderTable = (data, tabName) => { 
      // Get the column names from the first object
      const columns = Object.keys(data[0]);   
    
      return (
        <table className='table-wrapper'>
          <thead>
            <tr>
              { columns.map((col, colIndex) => {
                  if(colIndex === 0) {
                      return <th key={colIndex} className='custom-th' colSpan={2}>{tabName}</th>;
                  }
                  if(colIndex === 1) {
                      return false;
                  }
                  return <th key={colIndex} className='custom-th'>{col}</th>;
              }) }
            </tr>
          </thead>
          <tbody>
              { data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                  { columns.map((col, colIndex) => {
                      if(colIndex === 0 && rowIndex % 3 === 0) {
                          return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className='custom-td custom-td-center' rowSpan="3">{ row[col] }</td>;
                      } else if(colIndex === 0 && rowIndex % 3 !== 0) {
                          return false;
                      }
                      return <td key={colIndex} id={`${rowIndex}-${colIndex}`} className={`custom-td ${colIndex === 1 ? 'custom-td-status' : ''}`}>{ row[col] }</td>;
                  }) }
                  </tr>
              )) }

              {/* { rowData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                  { columns.map((col, colIndex) => (
                      <td key={colIndex} id={`${rowIndex}-${colIndex}`} className='custom-td'>{ row[col] }</td>
                  )) }
                  </tr>
              )) } */}
          </tbody>
        </table>
      );
  };
  /*========================================================================= */

    const lowerTabData = [
      {
        title: 'Training Status',
        content:
          <div className="sub-table">
            {/* <div className='grid'>
                <AgGrid data={rowData} column={column} paging={false} />
            </div> */}
            {renderTable(rowData, 'Training Status')}
          </div>
      },
      {
        title: 'Average Score',
        content: 
          <div className="sub-table">
            {/* <div className='grid'>
                <AgGrid data={rowData} column={column} paging={false} />
            </div> */}
            {renderTable(rowData, 'Average Score')}
          </div>
      },
  ];

    const tabData = [
        {
          title: 'Summary',
          content: 
          <div className='training-value-tab'>
            <div className="tab-menu sub-tab-menu">
            {
              lowerTabData.map((tab, index) => (
                <div
                key={index}
                className={`tab ${index === activeLowerTab ? 'active' : ''} sub-tab`}
                onClick={() => setActiveLowerTab(index)}
                >
                    {tab.title}
                </div>
              ))
            }
            </div>
            {
              lowerTabData[activeLowerTab].content
            }
          </div>,
        },
        {
          title: 'Training Status By Engineer',
          content: 
          <div className='training-value-tab'>
            <div className="table"> 
              {/* <div className='grid'>
                  <AgGrid data={rowData} column={column} paging={false} />
              </div> */}
                {renderTable(rowData, 'Training Status By Engineer')}
            </div>
          </div>
        },
        {
          title: 'Average Score By Engineer',
          content: 
          <div className='training-value-tab'>
            <div className="table">
              {/* <div className='grid'>
                  <AgGrid data={rowData} column={column} paging={false} />
              </div> */}
              {renderTable(rowData, 'Average Score By Engineer')}
            </div>
          </div>
        }
    ];

    return (
       <div className='training-container'>
       <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div className='training-nav'>
                <div className='nav-center'>
                    <div className='nav-box'>
                        <div className='nav-search'>
                            <p>· Subsidiary</p> <SelectBox options={subOptions} onChange={handleSelectBox} />
                        </div>
                        <div className='nav-search'>
                            <p>· Division</p> <SelectBox options={divOptions} onChange={handleSelectBox} />
                        </div>
                    </div>
                    <div className='nav-box'>
                        <div className='nav-search'>
                            <p>· Center</p> <SelectBox options={centerOptions} onChange={handleSelectBox} />
                        </div>
                        <div className='nav-search'>
                            <p>· Product</p> <SelectBox options={prodOptions} onChange={handleSelectBox} />
                        </div>
                    </div>
                    <div className='nav-box'>
                        <div className='nav-search'>
                            <p>· Branch</p> <SelectBox options={branchOptions} onChange={handleSelectBox} />
                        </div>
                        <div className='nav-search'>
                            <p>· Period</p> <CustomDatePicker isDuration={true} />
                            {/* <SelectBox options={subOptions} /> */}
                        </div>
                    </div>
                    <div className='nav-btn'>
                      <button className='circle'>
                          <p>Inquiry</p>
                          <IntersectIcon />
                      </button>
                    </div>
                </div>
                <div className='nav-right'>
                    <div className='nav-line'></div>
                    <button className="custom-flex-item custom-justify-center custom-align-item nav-btn-black">Training Request</button>
                </div>
            </div>
            
            {/** Summary */}
            <div className="tab-menu">{ renderTabs() }</div>
            <div className="training-value">{ renderContent() }</div>
            <Zendesk />
        </div>
        <Tab />
        </div>
    )
}

export default TrainingStatus
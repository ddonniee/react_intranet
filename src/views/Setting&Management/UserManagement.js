import { useState, useEffect } from 'react';
import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import Header from '../../components/Header';
import Top from '../../components/Top';
import SelectBox from '../../components/SelectBox';

import '../../scss/style.scss';
import { ReactComponent as HomeIcon } from '../../assets/svgs/icon_home.svg';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';

function UserManagement() {

    const jobType = [
        'LGC Director', 'Subsidiary Admin', 'Subsidiary Staff'
    ]

    const SelectCellRenderer = (props) => {
        const handleChange = (event) => {
          const selectedValue = event.target.value;
          props.setValue(selectedValue);
        };

        return (
          <select className='row-select' value={props.value} onChange={handleChange}>
            {
                jobType.map((job, i) => (
                    <option key={i} value={job}>{job}</option>
                ))
            }
          </select>
        );
      };

    const userColumn = [ // 컬럼 값 설정
        { 
            field: 'No',
            resizable: false,
            // spanHeaderHeight: true,
            // pinned: 'left',
            // width: 256,
            // suppressAutoSize: true
        },
        { 
            field: 'Subsidiary',
            resizable: false,
        },
        { 
            field: 'Center',
            resizable: false,
        },
        { 
            field: 'Branch',
            resizable: false,
        },
        { 
            field: 'Name',
            resizable: false,
        },
        { 
            field: 'Email',
            resizable: false,
        },
        { 
            field: 'User ID',
            resizable: false,
        },
        { 
            field: 'Phone No',
            resizable: false,
        },
        { 
            field: 'Mobile No',
            resizable: false,
        },
        { 
            field: 'Job Type',
            resizable: false,
            cellRendererFramework: SelectCellRenderer,
        },
    ];

    const userData = () => {
        let row = [];
        for(let i = 0; i < 20; i++) {
            row[i] = {
                'No': i+1,
                'Subsidiary': 'LGEAI',
                'Center': 'LGC',
                'Branch': '-',
                'Name': 'Alex Alex',
                'Email': 'alex@lgeai.com',
                'User ID': 'alex091',
                'Phone No': '10-547-4751',
                'Mobile No': '-',
            };
        }
        return row;
    }

    const [column, setColumn] = useState(userColumn);
    const [rowData, setRowData] =  useState(userData());
    const [isModify, setIsModify] = useState(false);
    
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

    const handleSelectBox = (event,params) => {
        const { data } = params.node;
        const { checked } = event.target;

        if (checked) {
            setRowData([...rowData, data]);
          } else {
            setRowData(rowData.filter(item => item !== data));
          }
    }

    // useEffect(() => {
    //     calculateGridHeight();
    //     window.addEventListener('resize', calculateGridHeight);
    //     return () => {
    //       window.removeEventListener('resize', calculateGridHeight);
    //     };
    // }, []);

    // const calculateGridHeight = () => {
    //     const contentHeight = rowData.length * 30; // Adjust the row height as per your requirement
    //     const gridContainer = document.querySelector('.ag-theme-alpine');
    //     if (gridContainer) {
    //         gridContainer.style.height = `${contentHeight}px`;
    //     }
    // };

    return (
        <div className='user-container'>
            <Header />
            <div className='inner-container'>
                {/** auth 권한체크로 수정 필요 */}
                <Top auth={1} searchArea={false}/>
                <div className='user-nav'>
                    <div className='nav-left'>
                        <p>· Subsidiary</p>
                        <SelectBox options={subOptions} onChange={handleSelectBox} />
                        <p>· Center Type</p>
                        <SelectBox options={centerOptions} onChange={handleSelectBox} />
                        <p>· Branch</p>
                        <SelectBox options={branchOptions} onChange={handleSelectBox} />
                    </div>
                    <div className='nav-right'>
                        <button className='circle'>
                            <p>Inquiry</p>
                            <IntersectIcon />
                        </button>
                        <div className='nav-line'></div>
                        {
                            isModify ?
                            <div className='btn-modify'>
                                <button className='nav-btn-white' onClick={() => setIsModify(false)}>Cancel</button>
                                <button className='nav-btn-red' onClick={() => setIsModify(false)}>Save</button>
                            </div>
                            :
                            <button className='nav-btn-black' onClick={() => setIsModify(true)}>Edit</button>
                        }
                    </div>
                    {/* <button className='nav-btn-black'>Edit</button> */}
                    {/* <div className='btn-modify'>
                        <button className='nav-btn-white'>Cancel</button>
                        <button className='nav-btn-red'>Save</button>
                    </div> */}
                </div>
                <div className='user-content'>
                    <div className='grid'>
                        <AgGrid data={rowData} column={column} paging={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement
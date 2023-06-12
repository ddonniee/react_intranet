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

    const SelectCellRenderer = (props) => {
        const handleChange = (event) => {
          const selectedValue = event.target.value;
          props.setValue(selectedValue);
        };

        const jobType = [
            'LGC Director', 'Subsidiary Admin', 'Subsidiary Staff'
        ]
      
        return (
          <select className='row-select' value={props.value} onChange={handleChange}>
            {
                jobType.map((job, i) => (
                    <option key={i} value={job}>{job}</option>
                ))
            }
            {/* <option value="Admin1">Subsidiary Admin</option>
            <option value="Admin2">Subsidiary Admin</option>
            <option value="Admin3">Subsidiary Admin</option> */}
          </select>
        );
      };

    const [column, setColumn] = useState([ // 컬럼 값 설정
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
    ]);

    
    const data = () => {
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

    const [rowData, setRowData] =  useState(data());
    
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

    const handleSelectBox = (e) => {
        console.log(e)
    }

    return (
        <div className='user-container'>
            <Header />
            <div className='inner-container'>
                <Top auth={false} />
                <div className='user-nav'>
                    <p>· Subsidiary</p>
                    <SelectBox options={subOptions} onChange={handleSelectBox} />
                    <p>· Center Type</p>
                    <SelectBox options={centerOptions} onChange={handleSelectBox} />
                    <p>· Branch</p>
                    <SelectBox options={branchOptions} onChange={handleSelectBox} />
                    <button className='circle'>
                        <p>Inquiry</p>
                        <IntersectIcon />
                    </button>
                    <div className='nav-line'></div>
                    <button className='nav-btn'>Edit</button>
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
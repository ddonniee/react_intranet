import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Top from '../../components/Top';
import Zendesk from '../../components/Zendesk';

import AgGrid from "../../components/AgGrid";
import EditCelldata from '../../components/EditCelldata';

import SelectBox from '../../components/SelectBox';

import '../../scss/style.scss';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';

function UserManagement() {

    const jobType = [
        'LGC Director', 'Subsidiary Admin', 'Subsidiary Staff'
    ]

    const SelectBoxRenderer = (props) => {
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

    const [isModify, setIsModify] = useState(false);

    const handleLeftCell = params => {
        const {data} = params;
        console.log('data', data.id)
        setRowData((prev)=> {
            prev.map((item)=>(item.id === data.id ? data : item))
        })
    }

    const userData = () => {
        let row = [];
        for(let i = 0; i < 20; i++) {
            row[i] = {
                id: i+1,
                subsidiary: 'LGEAI',
                center: 'LGC',
                branch: '-',
                name: 'Alex Alex',
                email: 'alex@lgeai.com',
                userId: 'alex091',
                phoneNo: '10-547-4751',
                mobileNo: '-',
            };
        }
        return row;
    }

    const [column, setColumn] = useState([ // 컬럼 값 설정
        { 
            headerName: 'No',
            field: 'id',
            resizable: false,
            // spanHeaderHeight: true,
            // pinned: 'left',
            // width: 256,
            // suppressAutoSize: true
        },
        { 
            headerName: 'Subsidiary',
            field: 'subsidiary',
            resizable: false,
            // editable: true, 
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Center',
            field: 'center',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Branch',
            field: 'branch',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Name',
            field: 'name',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Email',
            field: 'email',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'User ID',
            field: 'userId',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Phone No',
            field: 'phoneNo',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Mobile No',
            field: 'mobileNo',
            resizable: false,
            cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Job Type',
            field: 'jobType',
            resizable: false,
            cellRendererFramework: SelectBoxRenderer,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
    ]);
    const [rowData, setRowData] =  useState(userData());
    
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
                </div>
                <div className='user-content'>
                    <div className='grid'>
                        <AgGrid data={rowData} column={column} paging={false} changeValue={setRowData} isModify={isModify}/>
                    </div>
                </div>
                <Zendesk />
            </div>
        </div>
    )
}

export default UserManagement
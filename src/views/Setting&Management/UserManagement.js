import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Top from '../../components/Top';
import { axiosInstance, axiosJsonInstance } from '../../utils/CommonFunction';

import Zendesk from '../../components/Zendesk';
import AgGrid from "../../components/AgGrid";
import EditCelldata from '../../components/EditCelldata';

import SelectBox from '../../components/SelectBox';

import '../../scss/style.scss';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';

function UserManagement() {

    /* 검색 영역 ****************************************************************/
    const subOptions = [
        { value: 'LGEAI', label: 'LGEAI' },
        { value: 'LGEAI2', label: 'LGEAI2' },
    ]

    const centerOptions = [
        { value: 'LGC', label: 'LGC' },
        { value: 'ASC', label: 'ASC' },
    ]

    const branchOptions = [
        { value: 'branch_a', label: 'branch_a' },
        { value: 'branch_b', label: 'branch_b' },
    ]

    const handleSelectBox = (event, params) => {
        const { data } = params.node;
        const { checked } = event.target;

        if (checked) {
            setRowData([...rowData, data]);
          } else {
            setRowData(rowData.filter(item => item !== data));
          }
    }

    /* 조회 영역 ****************************************************************/
    const jobType = [
        'Subsidiary Staff',
        'Subsidiary Admin',
        'LGC Director',
        'LGC Engineer',
        'ASC Director',
        'ASC Engineer'
    ]
    const [isModify, setIsModify] = useState(false); // 수정 여부 (Edit 버튼)

    const handleButtonClick = (bool) => {
        setIsModify(bool);

        // setRowData((prevCol) =>
        //     prevCol.map((col, i) => {
        //         return {...col, editable: bool};
        // }))
        // setTimeout(() => {
        //     console.log('??????????????????', rowData)
        // }, 1000);
    };

    console.log('isModify ---->', isModify);

    const SelectBoxRenderer = (props) => {

        const handleChange = (event) => {
            const selectedValue = event.target.value;
            props.setValue(selectedValue);
            console.log('job type ---->', selectedValue);
        };

        return (
          <select className='row-select' value={props.value} onChange={handleChange}>
            {
                jobType.map((job, i) => (
                    <option key={i} value={job} disabled> {job} </option>
                ))
            }
          </select>
        );
    };

    const SelectBoxRendererEdit = React.forwardRef((props, ref) => {

        const handleChange = (e) => {
            const newValue = e.target.value;
            props.api.stopEditing();
            props.node.setDataValue(props.colDef.field, newValue);
            console.log('edit job type ---->', newValue);
        };

        return (
          <select className='row-select' ref={ref} value={props.value} onChange={handleChange}>
            {
                jobType.map((job, i) => (
                    <option key={i} value={job}> {job} </option>
                ))
            }
          </select>
        );
    });

    const CustomCellEditor = React.forwardRef((props, ref) => {
        // Implement your editor UI and logic here
        return <input type="text" ref={ref} value={props.value} 
        onChange={(e) => props.setValue(e.target.value)} />;
      });

    const handleLeftCell = params => {
        const {data} = params;
        console.log('data', data.id)
        setRowData((prev)=> {
            prev.map((item)=>(item.id === data.id ? data : item))
        })
    }

    const [rowData, setRowData] =  useState([]); // 사용자 목록
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
            field: 'corporationCode',
            resizable: false,
            // editable: true, 
            // cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Center',
            field: 'centerType',
            resizable: false,
            // cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Branch',
            field: 'branchName',
            resizable: false,
            // cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Name',
            field: 'userName',
            resizable: false,
            // cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Email',
            field: 'emailAddr',
            resizable: false,
            // cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'User ID',
            field: 'userId',
            resizable: false,
            // cellEditorFramework: EditCelldata, 
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Job Type',
            field: 'jobType',
            resizable: false,
            cellRendererFramework: SelectBoxRenderer,
            cellEditorFramework: SelectBoxRendererEdit,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
    ]);

    const [searchData, setSearchData] = useState({  // 검색데이터
        // page: 1,
    });
    
    const getList = () => {
        // 사용자목록 조회 API
        axiosInstance.post('/userManagement/list'/*, searchData*/).then(res => {
            const array = res?.data.result;
            console.log('사용자 목록 ---->', res)

            const newArray = array.map((obj, index) => ({
                ...obj,
                id: index + 1
            }));
            setRowData(newArray);
            
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getList();
        console.log('searchData ---->', searchData)
    }, [searchData]);    

    const [editData, setEditData] = useState();

    console.log('editData ---->', editData?.userId, '/', editData?.jobType);

    useEffect(() => {
        //
    }, [editData])

    const editUser = () => {
        const formData = new FormData();
        formData.append('userId', editData?.userId);
        formData.append('jobType', editData?.jobType);
        
        console.log('editUser ---->', Object.fromEntries(formData));
        
        // 사용자정보 수정 API
        axiosInstance.post('/userManagement/update', formData).then(res => {    
            let resdata = res.data;
            console.log('update >>>>>>>>>>', resdata);
            if(resdata.code == 200) {
              getList();
            } else {
              alert(resdata.msg);
            }
        }).catch(error => {
            console.error(error);
        });
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
                                <button className='nav-btn-white' onClick={() => handleButtonClick(false)}>Cancel</button>
                                <button className='nav-btn-red' onClick={() => {handleButtonClick(false); editUser();}}>Save</button>
                            </div>
                            :
                            <button className='nav-btn-black' onClick={() => handleButtonClick(true)}>Edit</button>
                        }
                    </div>
                </div>
                <div className='user-content'>
                    <div className='grid'>
                        <AgGrid data={rowData} column={column} paging={false} changeValue={setRowData} isModify={isModify} cellData={setEditData}/>
                    </div>
                </div>
                <Zendesk />
            </div>
        </div>
    )
}

export default UserManagement
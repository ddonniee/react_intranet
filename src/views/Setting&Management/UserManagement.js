import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
    const [searchData, setSearchData] = useState(); // 검색데이터

    const [subOptions, setSubOptions] = useState();
    // const subOptions = [
    //     { value: 'LGEAI', label: 'LGEAI', group: 'corporationCode' },
    //     { value: 'LGEKR', label: 'LGEKR', group: 'corporationCode' },
    //     { value: 'LGEES', label: 'LGEES', group: 'corporationCode' },
    // ]

    const centerOptions = [
        { value: 'LGC', label: 'LGC', group: 'centerType' },
        { value: 'ASC', label: 'ASC', group: 'centerType' },
    ]

    const branchOptions = [
        { value: 'Harper electric shop', label: 'Harper electric shop', group: 'branchCode' },
        { value: 'Isabella radio shop', label: 'Isabella radio shop', group: 'branchCode' },
        { value: 'Sophia radio shop', label: 'Sophia radio shop', group: 'branchCode' },
    ]

    const handleSelectBox = (e) => {
        // console.log('select ---->', e)
        let group = e.group;
        let value = e.value;

        if(group === 'corporationCode') {
            setSearchData({ ...searchData, corporationCode: value })
        } else if(group === 'centerType') {
            setSearchData({ ...searchData, centerType: value })
        } else if(group === 'branchCode') {
            setSearchData({ ...searchData, branchCode: value })
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

        setColumn((prevCol) =>
            prevCol.map((col, i) => {
                if(col.field === 'jobType') {
                    return {...col, cellRendererFramework: SelectBoxRendererEdit};
                }
        }))

        setRowData((prevCol) =>
            prevCol.map((col, i) => {
                return {...col, editable: bool};
        }))

        // setTimeout(() => {
        //     console.log('??????????????????', rowData)
        //     console.log('!!!!!!!!!!!!!!!!!!', column)
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
                    <option key={i} value={job} disabled={!isModify}> {job} </option>
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

    const handleLeftCell = params => {
        const {data} = params;
        console.log('data', data.id)
        setRowData((prev)=> {
            prev.map((item)=>(item.id === data.id ? data : item))
        })
    }

    const [rowData, setRowData] =  useState([]); // 사용자 목록
    const [originData, setOriginData] = useState([]); // 기존 사용자 목록
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
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Center',
            field: 'centerType',
            resizable: false,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Branch',
            field: 'branchName',
            resizable: false,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Name',
            field: 'userName',
            resizable: false,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Email',
            field: 'emailAddr',
            resizable: false,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'User ID',
            field: 'userId',
            resizable: false,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
        { 
            headerName: 'Job Type',
            field: 'jobType',
            resizable: false,
            cellRendererFramework: SelectBoxRenderer,
            // cellEditorFramework: SelectBoxRendererEdit,
            singleClickEdit: true, 
            cellEditorParams: {handleLeftCell}
        },
    ]);

    const getSearch = () => {
        const formData = new FormData();

        if(searchData.corporationCode) {
            formData.append('corporationCode', searchData?.corporationCode);
        } 
        if(searchData.centerType) {
            formData.append('centerType', searchData?.centerType);
        } 
        if(searchData.branchCode) {
            formData.append('branchCode', searchData?.branchCode);
        }
        let data = undefined;
        if(searchData) data = formData;

        console.log('search result >>>>>>', Object.fromEntries(data))

        getList(data);
    }
    
    const getList = (search) => {
        // 사용자목록 조회 API
        axiosInstance.post('/userManagement/list', search).then(res => {
            const array = res?.data.result;
            console.log('사용자 목록 ---->', array)

            const newArray = array.map((obj, index) => ({
                ...obj,
                id: index + 1
            }));
            setRowData(newArray);
            setOriginData(array);
            
        }).catch(error => {
            console.error(error);
        });
    }

    useLayoutEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        console.log('searchData ---->', searchData)
    }, [searchData]);

    const extractChangedPart = (originalArray, modifiedArray) => {
        const changedPart = [];
      
        originalArray.forEach((item, index) => {
          const modifiedItem = modifiedArray[index];
          if ((JSON.stringify(item.userId) === JSON.stringify(modifiedItem.userId)) &&
            (JSON.stringify(item.jobType) !== JSON.stringify(modifiedItem.jobType))) {
            changedPart.push({ userId: modifiedItem.userId, jobType: modifiedItem.jobType });
          }
        });
      
        return changedPart;
    }

    const editUser = () => {
        const changedPart = extractChangedPart(originData, rowData);
        const changedUser = JSON.stringify(changedPart);
        
        console.log('editUser ---->', changedUser);
        
        // 사용자정보 수정 API
        axiosJsonInstance.post('/userManagement/update', changedUser).then(res => {    
            let resdata = res.data;
            
            if(resdata.code == 200) {
              getList();
              alert('바뀜');
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
                        <SelectBox name='corporationCode' options={subOptions} handleChange={handleSelectBox} />
                        <p>· Center Type</p>
                        <SelectBox name='centerType' options={centerOptions} handleChange={handleSelectBox} />
                        <p>· Branch</p>
                        <SelectBox name='branchCode' options={branchOptions} handleChange={handleSelectBox} />
                    </div>
                    <div className='nav-right'>
                        <button className='circle' onClick={getSearch} >
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
                        <AgGrid data={rowData} column={column} paging={false} changeValue={setRowData} isModify={isModify} />
                    </div>
                </div>
                <Zendesk />
            </div>
        </div>
    )
}

export default UserManagement
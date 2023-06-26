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

    // 로그인유저 정보
    // const USER_INFO = sessionStorage.getItem('UserInfo');

    const USER_CORP_CODE = 'LGEAI' // 로그인유저 법인코드
    const USER_CENTER_TYPE = 'ASC' // 로그인유저 센터타입

    /* 검색 영역 ****************************************************************/
    const [searchData, setSearchData] = useState(); // 검색데이터

    const [subOptions, setSubOptions] = useState([]); // 법인 selectbox 데이터
    // const [centerOptions, setCenterOptions] = useState([]); // 센터타입 selectbox 데이터
    const [branchOptions, setBranchOptions] = useState([]); // 브랜치 selectbox 데이터

    const centerOptions = [
        { value: 'LGC', label: 'LGC', group: 'centerType' },
        { value: 'ASC', label: 'ASC', group: 'centerType' },
    ]

    const handleSelectBox = (e) => {
        console.log('select ---->', e)
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

    useEffect(() => {
        console.log('수정여부 ---->', isModify)

        setColumn((prevCol) =>
            prevCol.map((col, i) => {
                if(col.field === 'jobType') {
                    if(isModify) {
                        return { ...col, cellRendererFramework: SelectBoxRendererEdit };
                    } else {
                        return { ...col, cellRendererFramework: SelectBoxRenderer };
                    }
                }
                return { ...col };
        }))

        setRowData((prevCol) =>
            prevCol.map((col, i) => {
                return { ...col };
        }))

        !isModify && getList();
    }, [isModify])

    const SelectBoxRenderer = (props) => {
        const handleChange = (e) => {
            const selectedValue = e.target.value;
            props.setValue(selectedValue);
            console.log('job type ---->', selectedValue);
        };

        return (
          <select className='row-select' value={props.value} onChange={handleChange} disabled={!isModify}>
            {
                jobType.map((job, i) => (
                    <option key={i} value={job}> {job} </option>
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
        },
        { 
            headerName: 'Center',
            field: 'centerType',
            resizable: false,
        },
        { 
            headerName: 'Branch',
            field: 'branchName',
            resizable: false,
        },
        { 
            headerName: 'Name',
            field: 'userName',
            resizable: false,
        },
        { 
            headerName: 'Email',
            field: 'emailAddr',
            resizable: false,
        },
        { 
            headerName: 'User ID',
            field: 'userId',
            resizable: false,
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

        // 법인목록 조회 API
        axiosInstance.post('/corporation/list').then(res => {
            const data = res?.data.result;
            // console.log('법인 기존 목록 ---->', data)

            const newArray = data.map((obj, index) => ({
                value: obj.corporationCode,
                label: obj.corporationCode,
                group: 'corporationCode'
            }));
            console.log('법인 목록 ---->', newArray)

            setSubOptions(newArray);
            
        }).catch(error => {
            console.error(error);
        });

        // 브랜치목록 조회 API
        const branchForm = new FormData();
        branchForm.append('corporationCode', USER_CORP_CODE); // 로그인유저 법인코드
        // branchForm.append('centerType', USER_CENTER_TYPE); // 로그인유저 센터타입

        axiosInstance.post('/branch/list', branchForm).then(res => {
            const data = res?.data.result;
            // console.log('브랜치 기존 목록 ---->', data)

            const newArray = data.map((obj, index) => ({
                value: obj.branchCode,
                label: obj.branchName,
                group: 'branchCode'
            }));
            console.log('브랜치 목록 ---->', newArray)

            setBranchOptions(newArray);

        }).catch(error => {
            console.error(error);
        });
    }

    useLayoutEffect(() => {
        getList();
    }, []);

    // useEffect(() => {
    //     console.log('searchData ---->', searchData)
    // }, [searchData]);

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
                alert(`It's been completed`);
                window.location.reload();
            } else {
            //   alert(resdata.msg);
                console.log(resdata);
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
                                <button className='nav-btn-white' onClick={() => setIsModify(false)}>Cancel</button>
                                <button className='nav-btn-red' onClick={() => {setIsModify(false); editUser();}}>Save</button>
                            </div>
                            :
                            <button className='nav-btn-black' onClick={() => setIsModify(true)}>Edit</button>
                        }
                    </div>
                </div>
                <div className='user-content'>
                    <div className='grid'>
                        <AgGrid data={rowData} column={column} paging={false} changeValue={setRowData} />
                    </div>
                </div>
                <Zendesk />
            </div>
        </div>
    )
}

export default UserManagement
import React, {useEffect, useState,useLayoutEffect, useContext} from "react"
import Header from "../../components/Header"
import Zendesk from "../../components/Zendesk"
import Top from "../../components/Top"

import SelectBox from "../../components/SelectBox"
import SelectBoxRenderer from "../../components/SelectBoxRenderer"

import Search from '../../assets/svgs/icon_seeking.svg'
import AgGrid from "../../components/AgGrid";
import EditCelldata from "../../components/EditCelldata"
import axios from "axios"
import { axiosInstance, axiosJsonInstance, axiosTestInstance, getBrowserLanguage } from "../../utils/CommonFunction"
import Alert from "../../components/Alert"

import {UserContext} from '../../hooks/UserContext'
function CommonCodeMangement() {


    /** 
     * 메뉴 접근 권한
     * 본사 staff - 조회
     * 법인 admin - 조회 및 작성
     * 법인관리자, LGC 관리자, LGC 엔지니어, ASC 관리자, ASC 엔지니어 접근 권한 X
     */
    
    /** TEST DATA START  */
    let auth = 1;
    let loginCheck = 0;

    // if(loginCheck===0) {
    //     document.location.href='/login';
    // }

    /** Check User region */
    let browserLanguage = getBrowserLanguage();

    // 로그인 정보 받을 때 처리하기
    const user = useContext(UserContext);
    const [token, setToken] = useState('');

    useEffect(()=>{
      let role = user.role;
    },[])

    const [rowData, setRowData] = useState([]);
    /** TEST DATA END */

    /** check item sates */
    const [codeList, setCodeList] = useState([])
    // const [codeCheckedList, setCodeCheckedList] = useState([]);  multi 선택시 사용
    const [codeCheckedList, setCodeCheckedList] = useState();
    const [detailCheckedList, setDetailCheckedList] = useState([]);

    const [reqData, setReqData] = useState({
        useYn: 'All',
        keyword : '', // code ID,Name 만
      })  

    /** Alert Modal */
    const [alertModal, setAlertModal] = useState(false);
    const [alertTxt, setAlertTxt] = useState('');

  

    // select box options
    const [dropSelect, setDropSelect ] = useState([
        {value:'All',label:'ALL'}, 
        {value:'Y',label:'Y'}, 
        {value:'N',label:'N'}, 
    ])

    const handleValueSearch = event => {
        let value = event.target.value;
        setReqData({
            ...reqData,
            keyword: value
        })
        
    }
    // 검색영역 셀렉트박스 이벤트 핸들러
    const handleSelectBox = (event) => {
        let value = event.value;
        setReqData({
            ...reqData,
         useYn: value
        })
    }
    const handleCellValueChanged = (field, parentSeq ,seq, id, value) => {
        if (field === 'codeId') {
            let codeIdExists = false;
            subList.forEach((item) => {
              if (item.codeSeq !== seq && item.codeId === value) {
                setAlertTxt('The Code ID already exists.');
                codeIdExists = true;
              }
            });
            if (codeIdExists) {
              return;
            }
        }
        setSublist((prev) => {
          return prev.map((item) => {
            if (item.codeSeq === seq) {
              return { ...item, 
                [field]: value };
            }
            return item;
          });
        });
    }
    
 
    const handleLeftCell = (field, seq, id, value) => {
        if (field === 'codeId') {
            let codeIdExists = false;
            codeList.forEach((item) => {
              if (item.codeSeq !== seq && item.codeId === value) {
                setAlertTxt('The Code ID already exists.');
                codeIdExists = true;
              }
            });
            if (codeIdExists) {
              return;
            }
        }
        setCodeList((prev) => {
          return prev.map((item) => {
            if (item.codeSeq === seq) {
              return { ...item, 
                [field]: value };
            }
            return item;
          });
        });
      };

    const handleSearchCode = () => {

        var FormData = require('form-data');
        var data = new FormData();
        data.append('useYn', reqData.useYn);
        if(reqData.keyword!=='') {
            data.append('keyword', reqData.keyword);
        } 
        
        var config = {
          method: 'post',
            maxBodyLength: Infinity,
          data : data
        };

        axiosJsonInstance('/codeManagement/list', config).then(res=>{
            let rawData = res.data.result;
            let updatedData = rawData.map(item => ({
              ...item,
              type: 'update'
            }));
            console.log(rawData,'axios')
            if(rawData[0].parentCodeSeq===null) {
              setCodeList(updatedData);
            }
            else {
              setSublist(updatedData)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleChangeUse = (id,value) => {

        setCodeList((prev) => {
            return prev.map((item) => {
              if (item.codeId === id) {
                return { ...item, 
                  useYn : value };
              }
              return item;
            });
          });
    }
    
    const handleLowerUse = (id,value) => {

        setSublist((prev) => {
            return prev.map((item) => {
              if (item.codeId === id) {
                return { ...item, 
                  useYn : value };
              }
              return item;
            });
          });
    }
    /** AG grid columns */

    const [isNewCode, setIsNewCode] = useState(false)

    const handleCheckId = (depth) =>{
      let newItems = [];
        if(isNewCode && depth==='upper-code') {
            codeList.map(item=>{
                item.type==='insert' && newItems.push(item)
            })
            codeList.map(item=>{
                newItems.map(newItem=>{
                    (item.codeId===newItem.codeId && item.codeSeq !== newItem.codeSeq && newItem.codeId !== '') && 
                    setAlertTxt('The Code ID already exist.')
                    return false;
                })
            })
        }else if(isNewCode && depth==='lower-code') {
          subList.map(item=>{
            item.type==='insert' && newItems.push(item)
        })
          codeList.map(item=>{
            newItems.map(newItem=>{
                (item.codeId===newItem.codeId && item.codeSeq !== newItem.codeSeq && newItem.codeId !== '') && 
                setAlertTxt('The Code ID already exist.')
                return false;
            })
        })
          subList.map(item=>{
           newItems.map(newItem=>{
            (item.codeId===newItem.codeId && item.codeSeq !== newItem.codeSeq && newItem.codeId !== '') && 
            setAlertTxt('The Code ID already exist.')
                return false;
           }) 
          }) 
        }
    }
    const addCode = (depth) => {
      
        let newItem = {};
        if(depth==='upper-code') {
            newItem = { codeSeq: codeList.length+1, codeId: '', codeName: '', description : '', useYn : 'Y', type:'insert' };
            setCodeList(prevData => [...prevData, newItem]);
        }else if(depth==='lower-code' && codeCheckedList) {
            newItem = { codeSeq: subList.length+1, codeId: '', codeName: '', parentCodeSeq: codeCheckedList?.codeSeq, description : '', useYn : 'Y', type:'insert' };
            setSublist(prevData => [...prevData, newItem])
        }else if(depth==='lower-code' && !codeCheckedList) {
          setAlertTxt('No upper code has been selected')
        }
        setIsNewCode(true)
        };

    const onSaveEditCode = (e, depth) => {

        let isValid = true;
        let data = [];
        if(depth==='upper-code') {
            codeList.forEach(item=>{
                if(item.codeId ==='' || item.codeName === '' || item.description === '') {
                    setAlertTxt('You need to insert all the information to resister code.')
                    isValid = false;
                }
            })
            data = codeList;
        } else if(depth==='lower-code') {
            subList.forEach(item=>{
                if(item.codeId ==='' || item.codeName === '' || item.description === '') {
                    setAlertTxt('You need to insert all the information to resister code.')
                    isValid = false;
                }
            })
            data=subList;
        }

        if(isValid) {
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                // headers: { },
                data : data
                };
        
                axiosJsonInstance('/codeManagement/update',config)
                .then(function (response) {
                    let resData = response.data;
                    if(resData.code===200) {
                        setAlertTxt(`You've inserted or updated code information`)
                        handleSearchCode()
                        setIsNewCode(false);
                    }else {
                         setAlertTxt('Fail')
                    }
                })
                .catch(function (error) {
                        console.log('error',error);
                });
        }

    }

      const codeColumn =[
        // { headerName: '', field: '', checkboxSelection: true, headerCheckboxSelection: true, width: 100 },
        { headerName: 'Code ID', field: 'codeId', editable: false,  width: 200 },
        { headerName: 'Code Name', field: 'codeName', editable: true, width: 200 },
        { headerName: 'Code Description', field: 'description', editable: true, width: 200 },
        {
          headerName: 'Use Y/N',
          field: 'useYn',
          cellRendererFramework: SelectBoxRenderer,
          cellRendererParams: {
            column: {
              options: [{ label: 'Y', value: 'Y' }, { label: 'N', value: 'N' }],
            },
            handleChange: handleChangeUse,
          },
          valueGetter: function(params) {
            return params.data.name; // 셀의 값을 가져옴
          },
          valueSetter: function(params) {
            params.data.name = params.newValue; // 셀의 값을 설정함
            // 여기서 params.data.defaultValue를 사용하여 셀의 초기값을 설정할 수 있음
            return true;
          },
          width: 200,
        },
      ]

    const checkedColumn = [
      { headerName: 'Code ID', field: 'codeId', editable: false,  width: 200 },
      { headerName: 'Code Name', field: 'codeName', editable: true, width: 200 },
      { headerName: 'Code Description', field: 'description', editable: true, width: 200 },
      {
        headerName: 'Use Y/N',
        field: 'useYn',
        cellRendererFramework: SelectBoxRenderer,
        cellRendererParams: {
          column: {
            options: [{ label: 'Y', value: 'Y' }, { label: 'N', value: 'N' }],
          },
          handleChange: handleChangeUse,
        },
        valueGetter: function(params) {
          return params.data.name; // 셀의 값을 가져옴
        },
        valueSetter: function(params) {
          params.data.name = params.newValue; // 셀의 값을 설정함
          // 여기서 params.data.defaultValue를 사용하여 셀의 초기값을 설정할 수 있음
          return true;
        },
        width: 200,
      },
      ];

    useEffect(()=>{
        if(alertTxt!=='') {
            setAlertModal(true)
        }
    },[alertTxt])

    useEffect(()=>{
        if(!alertModal) {
            setAlertTxt('')
        }
    },[alertModal])
  
      // API test

      useLayoutEffect(()=>{
      
        handleSearchCode()
      },[])
      
      const [subList, setSublist] = useState([])
      useEffect(() => {

        if(codeCheckedList===null) {
            setSublist([])
            return 
        }
        var arr = new Array();

        arr.push(codeCheckedList?.codeSeq)
        var config = {
          method: 'post',
            maxBodyLength: Infinity,
          data :arr
        };

        axiosJsonInstance('/codeManagement/subList', config).then(res=>{
            let rawData = res.data.result
            let updatedData = rawData.map(item => ({
                ...item,
                type: 'update'
              }));
              setSublist(updatedData);
        }).catch((error)=>{
            console.error(error)
        })

      }, [codeCheckedList]);
      
      useEffect(()=>{
        handleCheckId('upper-code');
      },[codeList])
      useEffect(()=>{
        handleCheckId('lower-code')
      },[subList])
   
    return (
        <>
        <Header />
        <div className="inner-container">
        {/** Top Area */}
        <Top auth={ auth=== 1 ? true : false} searchArea={false}/>
            {/** Search Area */}
            <div className="code-contents custom-flex-item custom-justify-between">
                <div className="code-left">
                    <div className="code-left-search custom-flex-item custom-justify-between">
                        <div className="search-area custom-flex-item ">
                            <div className="custom-self-align">· Use Y/B</div>
                            <SelectBox options={dropSelect} handleChange={handleSelectBox} />
                            <div className="custom-self-align search-txt">· Search</div>
                            <input onChange={handleValueSearch}/>
                            <div className="search-wrapper" onClick={handleSearchCode}><img src={Search} alt='search-btn'/></div>
                        </div>
                       
                        <div className="left-search-btn custom-self-align">
                                <button onClick={()=>addCode('upper-code')} className="code">Add Code</button>
                                <button className="primary-red-btn" onClick={(e)=>onSaveEditCode(e,'upper-code')}>Save</button>
                        </div>
                    </div>

                   
                </div>
                
                <div className="code-right custom-flex-item custom-justify-between" >
                  <div className="right-detail custom-self-align">
                    <span>Code Detail </span>
                   <span className="max-length-txt">
                        {
                          codeCheckedList && 
                          `( ${codeCheckedList.codeId} )`
                        }
                    </span>
                  </div>
                  <div className="right-search-btn custom-self-align">
                                <button onClick={()=>addCode('lower-code')} className="code-detail">Add Code</button>
                                <button className="primary-red-btn"  onClick={(e)=>onSaveEditCode(e,'lower-code')}>Save</button>
                  </div>
                </div>
            </div>

            {/** List Area */}
            <div className="code-lists-wrapper custom-flex-item custom-justify-between">
                {codeList.length !== 0 && <div><AgGrid column={codeColumn} data={codeList} paging={false}  checkedItems={setCodeCheckedList}  changeValue={setCodeList} isModify={true} multiple={false}/></div>}
                {/* {codeCheckedList.length !== 0 && <div><AgGrid column={checkedColumn} data={testData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>} */}
                <div><AgGrid column={checkedColumn} data={subList} paging={false} checkedItems={setDetailCheckedList} changeValue={setSublist} isModify={true} multiple={false}/></div>
            </div>
            <Zendesk />
           {
            alertModal &&
            <Alert alertTxt={alertTxt} onClose={()=>setAlertModal(false)} btnTxt='Close' twoBtn={false} />
           }
       </div>
        </>
    )
}

export default CommonCodeMangement
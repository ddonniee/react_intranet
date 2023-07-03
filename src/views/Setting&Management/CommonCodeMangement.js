import React, {useEffect, useState,useLayoutEffect, useContext} from "react"
import Header from "../../components/Header"
import Zendesk from "../../components/Zendesk"
import Top from "../../components/Top"

import SelectBox from "../../components/SelectBox"
import Select from "react-select"

import Search from '../../assets/svgs/icon_seeking.svg'
import AgGrid from "../../components/AgGrid";
import EditCelldata from "../../components/EditCelldata"
import axios from "axios"
import { axiosInstance, axiosJsonInstance, axiosTestInstance, getBrowserLanguage } from "../../utils/CommonFunction"
import Alert from "../../components/Alert"

import {UserContext} from '../../hooks/UserContext'
function CommonCodeMangement() {


    /** 
     * 화면 접근 권한
     * 본사 staff    (LK)  : 조회
     * 법인관리자    (SS)  : none
     * 법인 admin    (SA)  : 조회 및 작성
     * LGC 관리자    (LD)  : none
     * LGC Engineer  (LE)  : none 
     * ASC 관리자    (AD)  : none
     * ASC Engineer  (AE)  : none
     */
    
    /** TEST DATA START  */

    const user = useContext(UserContext);

    const [auth, setAuth] = useState({
      isViewer : true,
      isWriter : true,
    })

    // useEffect(()=>{
    //   console.log(user)
    //   let role = user.role;
    //   if(role==='LK') {
    //     setAuth({
    //       ...auth,
    //       isViewer : true
    //     })
    //   }else if(role==='SA') {
    //     setAuth({
    //       ...auth,
    //       isViewer : true,
    //       isWriter : true
    //     })
    //   }else {
    //     alert('No right to Access')
    //     document.location.href='/login';
    //   }
    // },[])

    // if(loginCheck===0) {
    //     document.location.href='/login';
    // }

    /** Check User region */
    let browserLanguage = getBrowserLanguage();

    // 로그인 정보 받을 때 처리하기
    
    const [token, setToken] = useState('');



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
    
 
    const SelectBoxRenderer = (props) => {
      console.log(props)
      const handleChange = (e) => {
        
          const selectedValue = e.target.value;
          console.log(props.setValue,'props는 뭔데 ?')
          props.setValue(selectedValue);
          console.log('change use ---->', selectedValue);

          props.api.stopEditing();
          props.node.setDataValue(props.colDef.field, selectedValue);
          console.log('edit job type ---->', selectedValue);

      };

      const options = [
          {value : 'Y',label:'Y'},
          {value : 'N',label:'N'}
      ]
      return (
        // <select className='row-select' value={props.value} onChange={handleChange} defaultValue='Y'>
        //   {
        //       useOptions.map((job, i) => (
        //           <option key={i} value={job}> {job} </option>
        //       ))
        //   }
        // </select>
        <Select options={options} onChange={handleChange} value={options[0]}/>
      );
  };

    const handleLeftCell = (field, seq, id, value) => {
      console.log('field, seq, id, value',field, seq, id, value)
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
          data : data,
          headers: {
            'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
           },
        };

        axiosJsonInstance('/codeManagement/list', config).then(res=>{
            let rawData = res.data.result;
            let updatedData = rawData.map(item => ({
              ...item,
              type: 'update'
            }));
            console.log(rawData,'axios')
            if(rawData.length===0) {
              setCodeList([])
              // setAlertTxt('No result')
            }
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

    const handleChangeUse = params => {

      const {data} = params;
      console.log('==================================,', data)

        // setCodeList((prev) => {
        //     return prev.map((item) => {
        //       if (item.codeId === id) {
        //         return { ...item, 
        //           useYn : value };
        //       }
        //       return item;
        //     });
        //   });
    }
    
    const handleLowerUse = params => {


      const {data} = params;
      console.log('==================================,', data)
        // setSublist((prev) => {
        //     return prev.map((item) => {
        //       if (item.codeId === id) {
        //         return { ...item, 
        //           useYn : value };
        //       }
        //       return item;
        //     });
        //   });
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
            if(codeCheckedList.type==='insert') {
              setAlertTxt('Please save upper code first')
              return false
            }
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
                headers: {
                  'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
                 },
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
                      console.log(resData)
                        if(resData.msg !== null) {
                          setAlertTxt(resData.msg)
                        }else {
                          setAlertTxt('Failed')
                        }
                        //  console.log(resData)
                    }
                })
                .catch(function (error) {
                        console.log('error',error);
                });
        }

    }

    // const codeColumn =[
    //   // { headerName: '', field: '', checkboxSelection: true, headerCheckboxSelection: true, width: 100 },
    //   { headerName: 'ID', field: 'codeId', editable: isNewCode ? true : false, cellEditorFramework: EditCelldata, singleClickEdit: false, cellEditorParams: { handleLeftCell }, width: 200 },
    //   { headerName: 'Code Name', field: 'codeName', editable: auth.isWriter ? true : false, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
    //   { headerName: 'Code Description', field: 'description', editable: auth.isWriter ? true : false, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
    //   {
    //     headerName: 'Use Y/N',
    //     field: 'useYn',
    //     cellRendererFramework: SelectBoxRenderer,
    //     cellRendererParams: {
    //       column: {
    //         options: [{ label: 'Y', value: 'Y' }, { label: 'N', value: 'N' }],
    //       },
    //       handleChange: handleChangeUse,
    //     },
    //     valueGetter: function(params) {
    //       return params.data.name; // 셀의 값을 가져옴
    //     },
    //     valueSetter: function(params) {
    //       params.data.name = params.newValue; // 셀의 값을 설정함
    //       // 여기서 params.data.defaultValue를 사용하여 셀의 초기값을 설정할 수 있음
    //       return true;
    //     },
    //     width: 200,
    //   },
    // ]

    const [useOptions, setUseOption] = useState([
      'Y',
      'N',
    ])
    const codeColumn =[
      // { headerName: '', field: '', checkboxSelection: true, headerCheckboxSelection: true, width: 100 },
      { headerName: 'ID', field: 'codeId', editable: isNewCode ? true : false, cellEditor : 'agTextCellEditor', cellEditorParams: {
            useFormatter: true,
            maxLength: 200
        },width: 200 },
      { headerName: 'Code Name', field: 'codeName', editable: auth.isWriter ? true : false, cellEditor : 'agTextCellEditor', cellEditorParams: {
            useFormatter: true,
            maxLength: 200
        },width: 200 },
      { headerName: 'Code Description', field: 'description', editable: auth.isWriter ? true : false, cellEditor : 'agTextCellEditor', cellEditorParams: {
            useFormatter: true,
            maxLength: 200
        },width: 200 },
      {
        headerName: 'Use Y/N',
        field: 'useYn',
        cellRenderer: SelectBoxRenderer,
        cellEditorParams: {handleChangeUse},
        width: 200,
      },

    ]
    const checkedColumn = [
      { headerName: 'Code ID', field: 'codeId', editable: isNewCode ? true : false, cellEditor : 'agTextCellEditor', cellEditorParams : {cellEditor : 'agTextCellEditor', cellEditorParams: {}} , width: 200 },
      { headerName: 'Code Name', field: 'codeName', editable: auth.isWriter ? true : false, cellEditor : 'agTextCellEditor', cellEditorParams : {            useFormatter: true,}, width: 200 },
      { headerName: 'Code Description', field: 'description', editable: auth.isWriter ? true : false, cellEditor : 'agTextCellEditor', cellEditorParams : {            maxLength: 200} , width: 200 },
      {
        headerName: 'Use Y/N',
        field: 'useYn',
        cellRenderer: SelectBoxRenderer,
        cellEditorParams: {handleLowerUse},
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
            console.log(error)
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
        <Top auth={ auth.isViewer === 1 ? true : false} searchArea={false}/>
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
                       
                        {
                          auth.isWriter
                          &&
                          <div className="left-search-btn custom-self-align">
                                <button onClick={()=>addCode('upper-code')} className="code">Add Code</button>
                                <button className="primary-red-btn" onClick={(e)=>onSaveEditCode(e,'upper-code')}>Save</button>
                        </div>
                        }
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
                  {
                    auth.isWriter
                    &&
                    <div className="right-search-btn custom-self-align">
                                <button onClick={()=>addCode('lower-code')} className="code-detail">Add Code</button>
                                <button className="primary-red-btn"  onClick={(e)=>onSaveEditCode(e,'lower-code')}>Save</button>
                  </div>
                  }
                </div>
            </div>

            {/** List Area */}
            <div className="code-lists-wrapper custom-flex-item custom-justify-between">
                {codeList.length !== 0 && <div><AgGrid column={codeColumn} data={codeList} paging={false}  checkedItems={setCodeCheckedList}  changeValue={setCodeList} isModify={isNewCode} multiple={false}/></div>}
                {/* {codeCheckedList.length !== 0 && <div><AgGrid column={checkedColumn} data={testData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>} */}
                <div><AgGrid column={checkedColumn} data={subList} paging={false} checkedItems={setDetailCheckedList} changeValue={setSublist} isModify={isNewCode} multiple={false}/></div>
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
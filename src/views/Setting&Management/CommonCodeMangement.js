import React, {useEffect, useState,useLayoutEffect} from "react"
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

function CommonCodeMangement() {

    /** TEST DATA START  */
    let auth = 1;
    let loginCheck = 0;

    // if(loginCheck===0) {
    //     document.location.href='/login';
    // }

    /** Check User region */
    let browserLanguage = getBrowserLanguage();

    const [rowData, setRowData] = useState([]);
    /** TEST DATA END */

    /** check item sates */
    const [codeList, setCodeList] = useState([])
    const [codeCheckedList, setCodeCheckedList] = useState([]);
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
        console.log(event.value)
        let value = event.value;
        setReqData({
            ...reqData,
         useYn: value
        })
    }
    const handleCellValueChanged = params => {
        const {data} = params;
        console.log(' cellEditorParams: {handleCellValueChanged}',params)
        setRowData((prev)=> {
            prev.map((item)=>(item.id===data.id ? data : item))
        })
    }

    useEffect(()=>{
        console.log('rowData :', rowData)
    },[rowData])

    const handleLeftCell = (field, id, value) => {
        setCodeList((prev) => {
          return prev.map((item) => {
            if (item.codeId === id) {
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
            // url: process.env.REACT_APP_SERVER_URL+'/codeManagement/list',
        //   headers: { 
        //     ...data.getHeaders()
        //   },
          data : data
        };

        axiosJsonInstance('/codeManagement/list', config).then(res=>{
            let rawData = res.data.result;
            let updatedData = rawData.map(item => ({
              ...item,
              type: 'update'
            }));
            setCodeList(updatedData);
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
    /** AG grid columns */

    const [isNewCode, setIsNewCode] = useState(false)

    const addCode = () => {
        const newItem = { codeId: '', codeName: '', description : '', useYn : 'Y', type:'insert' };
        setCodeList(prevData => [...prevData, newItem]);
        setIsNewCode(true)
        };

    const onSaveEditCode = e => {

        if(isNewCode) {

            let newItems = [];
            codeList.map(item=>{
                item.type==='insert' && newItems.push(item.codeId)
            })
            codeList.map(item=>{
                newItems.map(newItem=>{
                    (item.codeId===newItem && item.type !=='insert') && 
                    setAlertTxt('The Code ID already exist.')
                    return false;
                })
            })
            
            return false;
        }
        var config = {
        method: 'post',
        maxBodyLength: Infinity,
        // headers: { },
        data : codeList
        };

        axiosJsonInstance('/codeManagement/update',config)
        .then(function (response) {
            let resData = response.data;
            console.log(resData.code===200)
            if(resData.code===200) {
                setAlertTxt(`You've inserted or updated code information`)
            }else {
                setAlertTxt('Fail')
            }
        })
        .catch(function (error) {
        console.log(error);
        });

    }

      const codeColumn =[
        { headerName: '', field: '', checkboxSelection: true, headerCheckboxSelection: true, width: 100 },
        { headerName: 'ID', field: 'codeId', editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
        { headerName: 'Code Name', field: 'codeName', editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
        { headerName: 'Code Description', field: 'description', editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
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
          width: 200
        },
      ]

    const checkedColumn = [
        { headerName: 'Code ID', field: 'codeId',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        { headerName: 'Code Name', field: 'codeName',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        { headerName: 'Code Description', field: 'description',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        {
          headerName: 'Use Y/N',
          field: 'useYn',
          cellRendererFramework: SelectBoxRenderer,
          cellRendererParams: {
            column: {
              options: [{label : 'Y', value:'Y'}, {label:'N', value:'N'}],
            },
            handleChange: handleChangeUse,
          },
        },
      ];

    useEffect(()=>{
        if(alertTxt!=='') {
            setAlertModal(true)
        }
    },[alertTxt])

  
      // API test

      useLayoutEffect(()=>{
        handleSearchCode()
      },[])
      
      const [testData, setTestData] = useState([])
      useEffect(() => {

        if(codeCheckedList.length===0) {
            setTestData([])
            return 
        }
        var arr = new Array();

        console.log(arr)
        codeCheckedList.forEach(item=>arr.push(item.codeId));
        
        var config = {
          method: 'post',
            maxBodyLength: Infinity,
        //   headers: { 
        //     ...data.getHeaders()
        //   },
          data :arr
        };
        axiosJsonInstance('/codeManagement/subList', config).then(res=>{
            let rawData = res.data.result
            setTestData(rawData)
            // setCodeList(rawData)
            console.log(res,'res')
        }).catch((error)=>{
            console.error(error)
        })

      }, [codeCheckedList]);
      
      useEffect(()=>{
        console.log(codeList)
      },[codeList])
      
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
                                <button onClick={addCode} className="code">Add Code</button>
                                <button className="primary-red-btn" onClick={onSaveEditCode}>Save</button>
                        </div>
                    </div>

                   
                </div>
                
                <div className="code-right custom-flex-item custom-justify-between" >
                  <div className="right-detail custom-self-align">
                    <span>Code Detail</span>
                   <span className="max-length-txt">
                        ({codeCheckedList.map((item,idx) => <> {idx < 6 ? item.codeId : null}
                        {(idx < 5 && idx !== codeCheckedList.length - 1) && ','}</>)}
                        {
                            codeCheckedList.length > 6 ? '... )' : ')'
                        }
                    </span>
                  </div>
                  <div className="right-search-btn custom-self-align">
                                <button onClick={addCode} className="code-detail">Add Code</button>
                                <button className="primary-red-btn">Save</button>
                  </div>
                </div>
            </div>

            {/** List Area */}
            <div className="code-lists-wrapper custom-flex-item custom-justify-between">
                {codeList.length !== 0 && <div><AgGrid column={codeColumn} data={codeList} paging={false} checkbox checkedItems={setCodeCheckedList}  changeValue={setCodeList} isModify={true}/></div>}
                {/* {codeCheckedList.length !== 0 && <div><AgGrid column={checkedColumn} data={testData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>} */}
                <div><AgGrid column={checkedColumn} data={testData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>
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
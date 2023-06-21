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
import { axiosJsonInstance, axiosTestInstance } from "../../utils/CommonFunction"

function CommonCodeMangement() {

    /** TEST DATA START  */
    let auth = 1;
    let loginCheck = 0;

    // if(loginCheck===0) {
    //     document.location.href='/login';
    // }

    
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

    const handleLeftCell = params => {
        console.log('handlelelelellel')
        const {data} = params;
        console.log('data',data.id)
        setCodeList((prev)=> {
            prev.map((item)=>(item.id===data.id ? data : item))
        })
    }

    const handleSearchCode = () => {

        console.log(reqData,';;;;;;;;;;;;;;;;;;;;;;;;')
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
            let rawData = res.data.result
            setCodeList(rawData)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleChangeUse = (e,v) => {
        let value = e.target
        console.log(value,v)
    }
    /** AG grid columns */

    const [codeColumn, setCodeColumn] = useState([
        { headerName: '', field: '', checkboxSelection: true, headerCheckboxSelection: true, width: 100 },
        { headerName: 'ID', field: 'CODE_ID', editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
        { headerName: 'Code Name', field: 'CODE_NAME', editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
        { headerName: 'Code Description', field: 'DESCRIPTION', editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: { handleLeftCell }, width: 200 },
        {
          headerName: 'Use Y/N',
          field: 'USE_YN',
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
      ]);
    

    const checkedColumn = [
        { headerName: 'Code ID', field: 'CODE_ID',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        { headerName: 'Code Name', field: 'CODE_NAME',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        { headerName: 'Code Description', field: 'DESCRIPTION',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        {
          headerName: 'Use Y/N',
          field: 'Use Y/N',
          cellRendererFramework: SelectBoxRenderer,
          cellRendererParams: {
            column: {
              options: [{label : 'Y', value:'Y'}, {label:'N', value:'N'}],
            },
            handleChange: handleChangeUse,
          },
        },
      ];

      

    // select box options
    const [dropSelect, setDropSelect ] = useState([
        {value:'All',label:'ALL'}, 
        {value:'Y',label:'Y'}, 
        {value:'N',label:'N'}, 
    ])
    
        const addCode = () => {
            const newItem = { CODE_ID: '', CODE_NAME: '', DESECRIPTION : '', USE_YN : 'Y' };
            setCodeList(prevData => [...prevData, newItem]);
          };

      
      // API test

      useLayoutEffect(()=>{
        handleSearchCode()
      },[])

      useEffect(()=>{
        console.log('reqData',reqData)
      },[reqData])

      
      const [testData, setTestData] = useState([])
      useEffect(() => {

        if(codeCheckedList.length===0) {
            setTestData([])
            return 
        }
        var arr = new Array();

        console.log(arr)
        codeCheckedList.forEach(item=>arr.push(item.CODE_ID));
        
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
                                <button className="primary-red-btn">Save</button>
                        </div>
                    </div>

                   
                </div>
                
                <div className="code-right custom-flex-item custom-justify-between" >
                  <div className="right-detail custom-self-align">
                    <span>Code Detail</span>
                   <span className="max-length-txt">
                        ({codeCheckedList.map((item,idx) => <> {idx < 6 ? item.CODE_ID : null}
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
                {codeList.length !== 0 && <div><AgGrid column={codeColumn} data={codeList} paging={false} checkbox checkedItems={setCodeCheckedList}  changeValue={setCodeList} /></div>}
                {/* {codeCheckedList.length !== 0 && <div><AgGrid column={checkedColumn} data={testData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>} */}
                <div><AgGrid column={checkedColumn} data={testData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>
            </div>
            <Zendesk />
       </div>
        </>
    )
}

export default CommonCodeMangement
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
        // setCodeList((prev)=> {
        //     prev.map((item)=>(item.id===data.id ? data : item))
        // })
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
    /** AG grid columns */

      const [codeColumn, setCodeColumn] = useState([
        { headerName: '' , field: '', checkboxSelection: true,  headerCheckboxSelection: true, width:100 },
        { headerName: 'ID' ,field: 'CODE_ID',editable:true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleLeftCell} , width:200},
        { headerName: 'Code Name' ,field: 'CODE_NAME',editable:true,  cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleLeftCell}, width:200},
        { headerName: 'Code Description' ,field: 'DESCRIPTION',editable:true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleLeftCell}, width:200 },
        {
            headerName: 'Use Y/N',
            field: 'USE_YN',
            cellRendererFramework: SelectBoxRenderer,
            cellRendererParams: {
              column: {
                options: [{label : 'Y', value:'Y'}, {label:'N', value:'N'}],
              },
              handleChange: handleSelectBox,
            },
            width:200
          },
    ])
    
    const checkedColumn = [
        { headerName: '', field: '',checkboxSelection: true, headerCheckboxSelection: true  },
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
            handleChange: handleSelectBox,
          },
        },
      ];

      

    // select box options
    const [dropSelect, setDropSelect ] = useState([
        {value:'All',label:'ALL'}, 
        {value:'Y',label:'Y'}, 
        {value:'N',label:'N'}, 
    ])
    
      const addCode = e => {
        let title = e.target.className;
        // 코드 등록
        if(title==='code') {
            const newRow = { id: codeList.length + 1,  isCheck : true, codeName : '-', description : '', isUse : false};
            setCodeList([...codeList, newRow])
        } 
        // 코드 정보 등록
        else if(title==='code-detail') {
            const newRow = { id: rowData.length + 1,  isCheck : true, codeName : '-', description : '', isUse : false};
            setRowData([...rowData, newRow])
        }
      }
      
      // API test

      useLayoutEffect(()=>{
        handleSearchCode()
      },[])

      useEffect(()=>{
        console.log('reqData',reqData)
      },[reqData])

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
                   <span>
                        ({codeCheckedList.map((item,idx) => <> {item.CODE_ID}
                        {idx !== codeCheckedList.length - 1 && ','}</>)})
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
                {codeList.length !== 0 && <div><AgGrid column={codeColumn} data={codeList} paging={false} checkbox checkedItems={setCodeCheckedList}  changeValue={setCodeList}/></div>}
                {codeCheckedList.length !== 0 && <div><AgGrid column={checkedColumn} data={codeCheckedList} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>}
            
            </div>
            <Zendesk />
       </div>
        </>
    )
}

export default CommonCodeMangement
import React, {useEffect, useState} from "react"
import Header from "../../components/Header"
import Zendesk from "../../components/Zendesk"
import Top from "../../components/Top"

import SelectBox from "../../components/SelectBox"
import SelectBoxRenderer from "../../components/SelectBoxRenderer"

import Search from '../../assets/svgs/icon_seeking.svg'
import AgGrid from "../../components/AgGrid";
import EditCelldata from "../../components/EditCelldata"

function CommonCodeMangement() {

    /** TEST DATA START  */
    let auth = 1;
    let loginCheck = 0;

    if(loginCheck===0) {
        document.location.href='/login';
    }
    const [codeList, setCodeList] = useState([
        {
            isCheck : true,
            id : 1,
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 2,
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            id : 3,
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            id : 4,
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 5,
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        }
    ])
    const [rowData, setRowData] = useState([
        {
            isCheck : true,
            id : 'C0001',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0002',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0003',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0004',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0005',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0001',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0006',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0007',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0008',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0009',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0010',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : false
        },
        {
            isCheck : true,
            id : 'C00011',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0012',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : false
        },
        {
            isCheck : true,
            id : 'C0013',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            id : 'C0014',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        }
    ]);
    /** TEST DATA END */
    /** check item sates */
    const [codeCheckedList, setCodeCheckedList] = useState([]);
    const [detailCheckedList, setDetailCheckedList] = useState([]);

    const handleSelectBox = (event,params) => {
        console.log(event.value)
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

    /** AG grid columns */

      const [codeColumn, setCodeColumn] = useState([
        { headerName: '' , field: 'isCheck', checkboxSelection: true,  headerCheckboxSelection: true, width:100 },
        { headerName: 'ID' ,field: 'id',editable:true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleLeftCell} , width:200},
        { headerName: 'Code Name' ,field: 'codeName',editable:true,  cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleLeftCell}, width:200},
        { headerName: 'Code Description' ,field: 'description',editable:true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleLeftCell}, width:200 },
        {
            headerName: 'Use Y/N',
            field: 'isUse',
            cellRendererFramework: SelectBoxRenderer,
            cellRendererParams: {
              column: {
                options: [{label : 'Y', value:true}, {label:'N', value:false}],
              },
              handleChange: handleSelectBox,
            },
            width:200
          },
    ])
    
    const columnDefs = [
        { headerName: '', field: 'isCheck',checkboxSelection: true, headerCheckboxSelection: true  },
        { headerName: 'Code ID', field: 'id',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        { headerName: 'Code Name', field: 'codeName',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        { headerName: 'Code Description', field: 'description',editable: true, cellEditorFramework: EditCelldata, singleClickEdit: true, cellEditorParams: {handleCellValueChanged} },
        {
          headerName: 'Use Y/N',
          field: 'isUse',
          cellRendererFramework: SelectBoxRenderer,
          cellRendererParams: {
            column: {
              options: [{label : 'Y', value:true}, {label:'N', value:false}],
            },
            handleChange: handleSelectBox,
          },
        },
      ];

      

    // select box options
    const [dropSelect, setDropSelect ] = useState([
        {value:'all',label:'ALL'}, 
        {value:'true',label:'Y'}, 
        {value:'false',label:'N'}, 
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
                            <input />
                            <div className="search-wrapper"><img src={Search} alt='search-btn'/></div>
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
                    <span>(C0001)</span>
                  </div>
                  <div className="right-search-btn custom-self-align">
                                <button onClick={addCode} className="code-detail">Add Code</button>
                                <button className="primary-red-btn">Save</button>
                  </div>
                </div>
            </div>

            {/** List Area */}
            <div className="code-lists-wrapper custom-flex-item custom-justify-between">
                <div><AgGrid column={codeColumn} data={codeList} paging={false} checkbox checkedItems={setCodeCheckedList}  changeValue={setCodeList}/></div>
                <div><AgGrid column={columnDefs} data={rowData} paging={false} checkbox checkedItems={setDetailCheckedList} changeValue={setRowData}/></div>
            
            </div>
            <Zendesk />
       </div>
        </>
    )
}

export default CommonCodeMangement
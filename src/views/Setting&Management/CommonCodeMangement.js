import React, {useEffect, useState} from "react"
import Header from "../../components/Header"
import Zendesk from "../../components/Zendesk"
import Top from "../../components/Top"

import SelectBox from "../../components/SelectBox"
import SelectBoxRenderer from "../../components/SelectBoxRenderer"

import Search from '../../assets/svgs/icon_seeking.svg'
import AgGrid from "../../components/AgGrid";

function CommonCodeMangement() {

    let auth = 1;

    const [dropSelect, setDropSelect ] = useState([
        {value:'all',label:'ALL'}, 
        {value:'true',label:'Y'}, 
        {value:'false',label:'N'}, 
    ])

    const [codeList, setCodeList] = useState([
        {
            isCheck : true,
            codeID : 'C0001',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'Mailing',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'SUB BI',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        }
    ])

    const [codeCheckedList, setCodeCheckedList] = useState([]);
    const [detailCheckedList, setDetailCheckedList] = useState([]);

    const handleSelectBox = (event,params) => {
    
        const selectedCode = {
            codeID: params.data.codeID,
            codeName: params.data.codeName,
            description: params.data.description,
            isUse: params.newValue,
          };
        
          if (params.newValue) {
            setCodeCheckedList((prevCheckedList) => [...prevCheckedList, selectedCode]);
          } else {
            setCodeCheckedList((prevCheckedList) =>
              prevCheckedList.filter((code) => code.codeID !== selectedCode.codeID)
            );
          }
    }

    useEffect(()=>{
        console.log(codeCheckedList)
        console.log(detailCheckedList)
    },[codeCheckedList, detailCheckedList])
    
    const [codeColumn, setCodeColumn] = useState([
        { headerName: '' , field: 'isCheck', checkboxSelection: true,  headerCheckboxSelection: true },
        { headerName: 'Code ID' ,field: 'codeID' },
        { headerName: 'Code Name' ,field: 'codeName' },
        { headerName: 'Code Description' ,field: 'description' },
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
    ])
    
   

    // donnie test
    const columnDefs = [
        { headerName: '', field: 'isCheck',checkboxSelection: true, headerCheckboxSelection: true  },
        { headerName: 'Code ID', field: 'codeID' },
        { headerName: 'Code Name', field: 'codeName' },
        { headerName: 'Code Description', field: 'description' },
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

      const [rowData, setRowData] = useState([
        {
            isCheck : true,
            codeID : 'C0001',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'Mailing',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'SUB BI',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'C0001',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'Mailing',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'SUB BI',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'C0001',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'Mailing',
            codeName : 'Mailing',
            description : 'Mailing address',
            isUse : true
        },
        {
            isCheck : true,
            codeID : 'SUB BI',
            codeName : 'SUB a',
            description : 'SUB',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        },
        {
            isCheck : true,
            codeID : '-',
            codeName : 'EW PERIOD',
            description : 'EW Period',
            isUse : true
        }
      ]);

      

      const addCode = e => {
        let title = e.target.className;
        // 코드 등록
        if(title==='code') {

        } 
        // 코드 정보 등록
        else if(title==='code-detail') {

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
                <div><AgGrid column={codeColumn} data={codeList} paging={false} checkbox checkedItems={setCodeCheckedList} /></div>
                <div><AgGrid column={columnDefs} data={rowData} paging={false} checkbox checkedItems={setDetailCheckedList}/></div>
            
            </div>
            <Zendesk />
       </div>
        </>
    )
}

export default CommonCodeMangement
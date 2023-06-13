import React, {useState} from "react"
import Header from "../../components/Header"
import Zendesk from "../../components/Zendesk"
import Top from "../../components/Top"

import SelectBox from "../../components/SelectBox";

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
    const [codeColumn, setCodeColumn] = useState([
        { headerName: '' , field: 'isCheck', checkboxSelection: true},
        { headerName: 'Code ID' ,field: 'codeID' },
        { headerName: 'Code Name' ,field: 'codeName' },
        { headerName: 'Code Description' ,field: 'description' },
        { headerName: 'Use Y/N' ,field: 'isUse', cellRenderer: 'selectBoxRenderer',cellRendererParams:{options:['Y','N']} },
    ])
    
    const handleSelectBox = e => {
        console.log(e)
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
                                <button>Add Code</button>
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
                                <button>Add Code</button>
                                <button className="primary-red-btn">Save</button>
                  </div>
                </div>
            </div>

            {/** List Area */}
            <div className="code-lists-wrapper custom-flex-item custom-justify-between">
                <div><AgGrid column={codeColumn} data={codeList} paging={false} /></div>
                <div><AgGrid column={codeColumn} data={codeList} paging={false} /></div>
            
            </div>
            <Zendesk />
       </div>
        </>
    )
}

export default CommonCodeMangement
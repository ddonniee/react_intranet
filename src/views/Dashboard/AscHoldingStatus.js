import { useContext, useEffect, useState } from "react"
import { fetchInstance } from "../../utils/CommonFunction"

import AgGrid from "../../components/AgGrid"
import Top from "../../components/Top"
import Alert from "../../components/Alert";

function AscHoldingStatus() {

    const [column, setColumn] = useState([ // 컬럼 값 설정
        { 
            headerName: 'No',
            field: 'no',
            resizable: false,
            maxWidth: 50
        },
        { 
            headerName: 'Hold Reason',
            field: 'reason',
            resizable: false,
            minWidth : 300
        },
        { 
            headerName: 'Division',
            field: 'division',
            resizable: false,
        },
        { 
            headerName: 'Responsibility to',
            field: 'staff',
            resizable: false,
        },
        { 
            headerName: 'Due date',
            field: 'dueDate',
            resizable: false,
        },
        { 
            headerName: 'Pending date',
            field: 'pendingDate',
            resizable: false,
        },
    ]);

    const [isFetching, setIsFetching] = useState(false)
    const [rowData, setRowData] = useState([])

    const getList = () =>{
        setIsFetching(true)
        fetchInstance('/ascData')
        .then(function (response){
            console.log(response)
            // API 연동시 status객체에 내려오는 코드로 통신확인
            if(response) {
                setRowData(response)
            }else {
                console.log(response)
                setAlertSetting({
                    ...alertSetting,
                    alertTxt: "Client Error"
                })
            }
            setIsFetching(false)
        })
        .catch(function(error) {
            console.log('error',error)
            setAlertSetting({
                ...alertSetting,
                alertTxt: "Server Error"
            })
            setIsFetching(false)
        })
    }

    /** Alert Handler Start */
    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })

    useEffect(()=>{
        if(!alertModal) {
           setAlertSetting({
            alertTxt : '',
            onConfirm : function() {},
            isDoubleBtn : false,
            btnTxt : 'Close',
            confirmTxt : ''
           })
        }
    },[alertModal])
    
    useEffect(()=>{
        if(alertSetting.alertTxt!==''){
            setAlertModal(true)
        }else {
            setAlertModal(false)
        }
    },[alertSetting])

     /** Alert Handler End */

    useEffect(()=>{
        getList()
    },[])
    return (
        <>
        <div className="inner-container">
            <Top auth={1} searchArea={false}/>
            <div className='user-content'>
                    {
                        rowData.length !== 0 &&
                        <div className='grid'>
                        <AgGrid data={rowData} column={column} paging={false} changeValue={setRowData} />
                    </div>
                    }
                </div>
                {
                    alertModal &&
                    <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
                }
        </div>
        </>
    )
}

export default AscHoldingStatus
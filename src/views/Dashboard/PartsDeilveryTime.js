import React ,{useState} from "react";

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from "../../components/SelectBox";
import CustomDatePicker from "../../components/DatePicker";
import { generateRandomString } from "../../utils/CommonFunction";
import { styled } from "styled-components";

function PartsDeliveryTime() {

  const [subsidiary, setSubsidiary ] = useState([
    {value:'LGEAI',label:'LGEAI'}, 
    {value:'LGECI',label:'LGECI'}, 
    {value:'LGEES',label:'LGEES'}, 
    {value:'LGEJP',label:'LGEJP'}, 
    {value:'LGEKR',label:'LGEKR'},
    {value:'LGEMC',label:'LGEMC'},
])

const options = [
  {value:'invoice',label:'LG Invoice Number'}, 
  {value:'part',label:'Part Number'}, 
  {value:'request',label:'Request Number'}, 
]
const [reqData, setReqData] = useState({
  subsidiary: '',
  centerType : '',
  center: '',
  branch :'',
  period : '',
  text : '',

})

const handleChangeInput = e => {
  console.log(e.target.value)
  let value = e.target.value
  setReqData({
    ...reqData,
    text : value
  })
}

// test data
const [boardData, setBoardData] = useState([
  {
    center : '',
    branch : 'Seoul',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'Delivered',
  },
  {
    center : '',
    branch : 'Seoul',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'ordFailedered',
  },
  {
    center : 'LGKER',
    branch : 'Seoul',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'Failed',
  },
  {
    center : 'LGKER',
    branch : 'Suwon',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2022.11.23',
    issueDate : '2022.11.26',
    eta : '2023.03.17',
    invoice : 'e-1234123',
    status : 'Delivered',
  },
  {
    center : 'LGKER',
    branch : 'Anyang',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'ordered',
  },
  {
    center : 'LGKER',
    branch : 'Pusan',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'Delivered',
  },
  {
    center : 'sac',
    branch : 'New York',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'ordered',
  },
  {
    center : 'LGKER',
    branch : 'Paris',
    reqNumber : 2343,
    partsNumber : 1234,
    quantity : 232,
    orderDate : '2021.11.23',
    issueDate : '2023.03.21',
    eta : '2023.08.17',
    invoice : 'e-1234123',
    status : 'ordered',
  }
])
      return (
        <>
        <Header />
        <Style>
        <div className="inner-container pdt-container">
            <Top auth={1} searchArea={false}/>
            <div className="search-from custom-flex-item custom-justify-between ">
              <div className="left">
                <ul className="custom-flex-item custom-align-item custom-justify-between first-layer">
                  <li className="custom-flex-item custom-align-item">· Subsidiary<SelectBox options={subsidiary}/></li>
                  <li>· Center Type
                    <input value="Center"/>
                  </li>
                  <li>· Center 
                    <input value="Branch"/>
                  </li>
                  <li>· Branch 
                    <input value="Branch"/>
                  </li>
                </ul>
                <ul className="custom-flex-item custom-justify-between second-layer">
                  <li className="custom-flex-item custom-align-item">· Period<CustomDatePicker isDuration/></li>
                  <li className="custom-flex-item custom-align-item">· Detail Search<SelectBox options={options} placeholder='Select'/><input onChange={handleChangeInput}/></li>
                </ul>
              </div>
              <div className="right">
                <button>Inquiry</button>
              </div>
            </div>
            <div className="contents">
              <ul className="board-table custom-align-item custom-flex-item custom-sticky-area">
                    <li className="col-1">Center</li>
                    <li className="col-2">Branch</li>
                    <li className="col-3">Request Number</li>
                    <li className="col-4">Parts Number</li>
                    <li className="col-5">Order Q`ty</li>
                    <li className="col-6">Order Date</li>
                    <li className="col-7">Issue Date</li>
                    <li className="col-8">ETA</li>
                    <li className="col-9">LG Invoices</li>
                    <li className="col-10">Status</li>
                </ul>
                <div className="board-list ">
                {
                  boardData &&
                  boardData.map((item,idx)=>{
                    return (
                      <div className="custom-flex-item custom-align-item cursor-btn" key={generateRandomString(idx)}>
                        <ul className="col-1">
                          <li id={`part-item-${idx+1}`}>{item.center}</li>
                        </ul>
                        <ul className="col-2">
                          <li id={`part-item-${idx+1}`}>{item.branch}</li>
                        </ul>
                        <ul className="col-3">
                          <li id={`part-item-${idx+1}`}>{item.reqNumber}</li>
                        </ul>
                        <ul className="col-4">
                          <li id={`part-item-${idx+1}`}>{item.partsNumber}</li>
                        </ul>
                        <ul className="col-5">
                          <li id={`part-item-${idx+1}`}>{item.quantity}</li>
                        </ul>
                        <ul className="col-6">
                          <li id={`part-item-${idx+1}`}>{item.orderDate}</li>
                        </ul>
                        <ul className="col-7">
                          <li id={`part-item-${idx+1}`}>{item.issueDate}</li>
                        </ul>
                        <ul className="col-8">
                          <li id={`part-item-${idx+1}`}>{item.eta}</li>
                        </ul>
                        <ul className="col-9">
                          <li id={`part-item-${idx+1}`}>{item.invoice}</li>
                        </ul>
                        <ul className="col-10">
                          <li id={`part-item-${idx+1}`}>{item.status}</li>
                        </ul>
                      </div>
                    )
                  })
                }
                </div>
            </div>
            <Zendesk />
        </div>
        </Style>
        </>
      );
}
export default PartsDeliveryTime

const Style = styled.div `
        .col-1 {
          width: 155px;
        }
        .col-2 {
          width: 155px;
        }
        .col-3 {
          width: 159px; 
        }
        .col-4 {
          width: 159px;
        }
        .col-5 {
          width: 155px;
        }
        .col-6 {
          width: 155px;
        }
        .col-7 {
          width: 155px;
        } 
        .col-8 {
          width: 155px;
        }
        .col-9 {
          width: 155px;
        }
        .col-10 {
          width: 155px; 
        }

`
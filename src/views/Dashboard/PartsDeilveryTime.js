import React ,{useState} from "react";

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from "../../components/SelectBox";
import CustomDatePicker from "../../components/DatePicker";

function PartsDeliveryTime() {

  const [subsidiary, setSubsidiary ] = useState([
    {value:'LGEAI',label:'LGEAI'}, 
    {value:'LGECI',label:'LGECI'}, 
    {value:'LGEES',label:'LGEES'}, 
    {value:'LGEJP',label:'LGEJP'}, 
    {value:'LGEKR',label:'LGEKR'},
    {value:'LGEMC',label:'LGEMC'},
])

const [reqData, setReqData] = useState({
  subsidiary: '',
  centerType : '',
  center: '',
  branch :'',
  period : '',
  text : '',

})
      return (
        <>
        <Header />
        <div className="inner-container pdt-container">
            <Top auth={1} searchArea={false}/>
            <div className="search-from custom-flex-item custom-justify-between">
              <div className="left">
                <ul className="custom-flex-item custom-align-item">
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
                <ul className="custom-flex-item custom-justify-between">
                  <li className="custom-flex-item custom-align-item">· Period<CustomDatePicker isDuration/></li>
                  <li className="custom-flex-item custom-align-item">· Detail Search<SelectBox options={subsidiary}/></li>
                </ul>
              </div>
              <div className="right">
                <button>Inquiry</button>
              </div>
            </div>
            <div className="contents"></div>
            <Zendesk />
        </div>
        </>
      );
}
export default PartsDeliveryTime
import React ,{useState} from "react";

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"

function PartsDeliveryTime() {
      return (
        <>
        <Header />
        <div className="inner-container">
            <Top auth={1} searchArea={false}/>
            <Zendesk />
        </div>
        </>
      );
}
export default PartsDeliveryTime
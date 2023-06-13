import React ,{useState} from "react";

import TicketHistory from "../../components/TicketHistory";
import CreateTicket from "../../components/CreateTicket";
import FileUpload from "../../hooks/FileUpload";

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"

function PartsDeliveryTime() {
      return (
        <>
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            <Zendesk />
        </div>
        </>
      );
}
export default PartsDeliveryTime
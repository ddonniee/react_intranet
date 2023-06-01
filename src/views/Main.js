import React ,{useState} from "react";

import TicketHistory from "./TicketHistory";
import CreateTicket from "../components/CreateTicket";
import FileUpload from "../hooks/FileUpload";
function Main() {
      return (
        <div>
          <h1>Main</h1>
          <CreateTicket />
          <TicketHistory />
        </div>
      );
}
export default Main
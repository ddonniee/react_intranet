import React ,{useState} from "react";

import TicketHistory from "./TicketHistory";
import CreateTicket from "../components/CreateTicket";

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
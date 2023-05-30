import React, { useEffect,useState } from 'react';
import axios from 'axios';

function TicketHistory() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_ZENDESK_URL, {
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_ZENDESK_API_KEY}`,
        'Access-Control-Allow-Origin' : process.env.REACT_APP_FRONT_URL,
        'withCredentials':true
      }
    }).then((response) => {
      setTickets(response.data);
    }).catch((err) => {
      console.log('error',err)
    });
  }, []);

  
  return (
    <div>
      <h1>Ticket History</h1>
      {/* 여기에 히스토리 목록을 표시하는 JSX를 추가할 수 있습니다. */}
    </div>
  );
}

export default TicketHistory;

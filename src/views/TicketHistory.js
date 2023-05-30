import React, { useEffect } from 'react';
import axios from 'axios';

function TicketHistory() {
  useEffect(() => {
    const fetchTicketHistory = async () => {
      try {
        const response = await axios.post('https://pospot.zendesk.com/api/v2/ticket_audits.json', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ZENDESK_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        // 여기서 히스토리 데이터를 처리하거나 상태에 저장할 수 있습니다.
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicketHistory();
  }, []);

  return (
    <div>
      <h1>Ticket History</h1>
      {/* 여기에 히스토리 목록을 표시하는 JSX를 추가할 수 있습니다. */}
    </div>
  );
}

export default TicketHistory;

import React, { useEffect,useState } from 'react';
import axios from 'axios';

function TicketHistory() {

  const [tickets, setTickets] = useState([]);
  const [useEmail, setUseEmail] = useState('donnie.lee@pospot.kr')
  // useEffect(() => {
  //   const fetchTicketList = async () => {
  //     try {
  //       const response = await axios.get(process.env.REACT_APP_ZENDESK_URL, {
  //         headers: {
  //           Authorization: 'Basic ' + btoa(`donnie.lee@pospot.kr:${process.env.REACT_APP_ZENDESK_API_KEY}`)
  //         }
  //       });
  //       console.log(response.data);
  //       // Handle the ticket list data here or store it in the state
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchTicketList();
  // }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_ZENDESK_URL, {
      auth: {
        username : useEmail+'/token',
        password : process.env.REACT_APP_ZENDESK_API_KEY
      }
      // headers: {
      //   Authorization: 'Basic ' + btoa(`donnie.lee@pospot.kr/token:${process.env.REACT_APP_ZENDESK_API_KEY}`)
      // }
    }).then((response) => {
      setTickets('tickets',response.data);
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



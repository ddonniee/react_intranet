import React, { useEffect } from "react";
import { ZendeskAPI  } from 'react-zendesk'
import Zendesk from "react-zendesk";

function CreateTicket() {

  const setting = {
    webWidget: {
      helpCenter: {
        suppress: false,
      },
      contactForm: {
        suppress: false,
      },
      ticketForm: {
        suppress: true,
        subject: true,
        fields: [
          {
            id: "description",
            prefill: {
              "*": "Default ticket description",
            },
          },
        ],
      },
      history : true
    },
  };
  return (
    <>
     <Zendesk defer zendeskKey={process.env.REACT_APP_ZENDESK_KEY} {...setting} onLoaded={() => console.log('is loaded')} />
    </>
  );

}

export default CreateTicket;

import React from 'react'
import styled from 'styled-components';

function Footer() {

    return (
        <Style>
        <div className="footer-wrapper">
           <div>Copyright ⓒ 2023 Portal site. ALL Rights Reserved</div>
        </div>
        </Style>

    )
}

export default Footer

const Style = styled.div`
    .footer-wrapper div{
        text-align: center; padding: 30px;
    }
`


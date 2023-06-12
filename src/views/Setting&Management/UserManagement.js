import { useState, useEffect } from 'react';
import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import Header from '../../components/Header';
import Top from '../../components/Top';

import '../../scss/style.scss';
import { ReactComponent as HomeIcon } from '../../assets/svgs/icon_home.svg';

function UserManagement() {

    const btn = document.querySelector('.btn-select');
    const list = document.querySelector('.list-member');

    btn.addEventListener('click', () => {
        btn.classList.toggle('on');
    });

    list.addEventListener('click', (event) => {
        if (event.target.nodeName === "BUTTON") {
            btn.innerText = event.target.innerText;
            btn.classList.remove('on');
        }
    });

    return (
        <div className='user-container'>
            <Header />
            <div className='inner-container'>
                {/* <Top search={false} /> */}
                <div className="nav">
                    <h2 className='user-title'>User Management</h2>
                    <p className='user-nav'><HomeIcon />&nbsp;{` > Support > Main`}</p>
                </div>
                <div className='user-nav'>
                    <p>· Subsidiary</p>
                    <div class="cont-select">
                        <button class="btn-select">LGEAI</button>
                        <ul class="list-member">
                            <li><button type="button">Python</button></li>
                            <li><button type="button">Java</button></li>
                            <li><button type="button">JavaScript</button></li>
                            <li><button type="button">C#</button></li>
                        </ul>
                    </div>
                    <p>· Center Type</p>
                    <input type='text' />
                    <p>· Branch</p>
                    <input type='text' />
                </div>
            </div>
        </div>
    )
}

export default UserManagement
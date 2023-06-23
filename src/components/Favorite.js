import React, {useState, useEffect} from "react";

import { generateRandomString } from "../utils/CommonFunction";
import Close from '../assets/svgs/icon_close.svg'
import Fav from '../assets/svgs/icon_fav.svg';
import NonFav from '../assets/svgs/icon_non_fav.svg';
import Main from '../assets/svgs/icon_setting_home.svg';
import Alert from "./Alert";

const Favorite = props => {

    const {onClose} = props;

    const handleSaveFav = e => {
        console.log(e)
    }
    const [menu, setMenu] = useState([
        {
            label :'Main',
            lowerMenu : [
                {
                    label : 'home',
                    value : 'main',
                    path : '/',
                    isFavorie : false,
                },
            ],
        },
        {
            label :'Dashboard',
            lowerMenu : [
                {
                    label : 'KPI Performance',
                    value : 'kpi',
                    path : '/dashboard/kpiperformance',
                    isFavorie : true,
                },
                {
                    label : 'Evaluation / Incentive',
                    value : 'evaluation',
                    path : '/dashboard/evaluation',
                    isFavorie : false,
                },
                {
                    label : 'Training Status',
                    value : 'traing',
                    path : '/dashboard/trainingstatus',
                    isFavorie : false,
                },
                {
                    label : 'Work In Process',
                    value : 'wip',
                    path : '/dashboard/wip',
                    isFavorie : true,
                },
                {
                    label : 'ASC Hold Status',
                    value : 'asc',
                    path : '/dashboard/ascholdingstatu',
                    isFavorie : false,
                },
                {
                    label : 'Part Delicery Time',
                    value : 'delivery',
                    path : '/dashboard/partsdeliverytime',
                    isFavorie : false,
                },
            ]
        },
        {
            label :'Process Support',
            lowerMenu : [
                {
                    label : 'Process & FAQ',
                    value : 'faq',
                    path : '/process&support/faq',
                    isFavorie : true,
                },
                {
                    label : 'Request & QnA',
                    value : 'ticket',
                    path : '/',
                    isFavorie : false,
                },
                {
                    label : 'New Ticket',
                    value : 'ticket',
                    path : process.env.REACT_APP_US_ISSUE_TICKET,
                    isFavorie : false,
                },
                {
                    label : 'Request History',
                    value : 'history',
                    path : '/',
                    isFavorie : true,
                },
            ]
        },
           {
             label :'Board',
            lowerMenu : [
                {
                    label : 'Notice',
                    value : 'notice',
                    path : '/board/notice',
                    isFavorie : false,
                },
                {
                    label : 'CS Talk',
                    value : 'cs talk',
                    path : '/board/cstalk',
                    isFavorie : false,
                },
            ] 
        }
    ])

    const [alertModal, setAlertModal] = useState(false)
    let alertTxt = 'Do you want to set the selected menu as the first screen?';
    const handleClickLink = e => {
        
        let path = e.target.title;
        console.log(path)
        // window.location.assign(process.env.REACT_APP_FRONT_URL+path)
    }
    
    return (
        <>
            <div className="modal">
                <div className="favorite-content custom-flex-item custom-justify-between">
                    <div className="favorite-top custom-flex-item custom-justify-between">
                        <div className="custom-flex-item">
                            <span>My Favorite</span>
                            <span>Select to add the menu to My Favorites.When you enable home, you can select the first screen at login.</span>
                        </div>
                        <img src={Close} alt="close-btn" onClick={onClose} />
                    </div>
                    <div className="favorite-middle">
                        <ul className="custom-flex-item custom-justify-between upper-menu">
                        {
                            menu.map((item,idx)=>{
                                return (
                                    <li className={`${item.label}-list`} key={generateRandomString(idx)}>
                                        · {item.label}
                                        <ul>
                                        {item.lowerMenu.map((lw,idx)=>{
                                            return (
                                                <li key={generateRandomString(idx)} title={lw.path} onClick={handleClickLink}><img src={lw.isFavorie ? Fav : NonFav} alt="fsv-btn"/><span>{lw.label}</span><img src={Main} alt="user-custom-main-btn"/></li>
                                            )
                                        })}
                                        </ul>
                                    </li>
                                )   
                            })
                        }
                        </ul>
                    </div>
                    <div className="favorite-bottom">
                        <button onClick={onClose} className="cancel-btn">Cancel</button>
                        <button onClick={()=>setAlertModal(true)} className="primary-red-btn">Save</button>
                    </div>
                </div>
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertTxt} onClose={()=>setAlertModal(false)} btnTxt='Confirm' twoBtn onConfirm={handleSaveFav}/>
            }
        </>
    )
}

export default Favorite
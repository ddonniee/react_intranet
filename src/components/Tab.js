import React,{Fragment, useEffect, useRef, useState} from "react";
import { styled } from "styled-components";

import {fetchInstance, generateRandomString} from '../utils/CommonFunction'
import Close from '../assets/svgs/icon_closetab.svg'
import Setting from '../assets/svgs/icon_setting.svg'

import Favorite from "./Favorite";
const Tab = () => {

    const modalRef = useRef(null);
    const [openTab, setOpenTab] = useState(false);
    const [favModal, setFavModal] = useState(false);

    const handleTab = () =>{
        setOpenTab(!openTab)
    }

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
         setOpenTab(false)
        }
      }; 

    const [userPreference, setUserPreference] = useState(null);
    const [menu, setMenu] = useState([
        {
            label :'Main',
            isHave : false,
            lowerMenu : [
                {
                    label : 'home',
                    value : 'main',
                    path : '/',
                    isFavorite : false,
                    isHome : false
                },
            ],
        },
        {
            label :'Dashboard',
            isHave : false,
            lowerMenu : [
                {
                    label : 'KPI Performance',
                    value : 'kpi',
                    path : '/dashboard/kpiperformance',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'Evaluation / Incentive',
                    value : 'evaluation',
                    path : '/dashboard/evaluation',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'Training Status',
                    value : 'training',
                    path : '/dashboard/trainingstatus',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'Work In Process',
                    value : 'wip',
                    path : '/dashboard/wip',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'ASC Hold Status',
                    value : 'asc',
                    path : '/dashboard/ascholdingstatu',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'Part Delicery Time',
                    value : 'delivery',
                    path : '/dashboard/partsdeliverytime',
                    isFavorite : false,
                    isHome : false
                },
            ]
        },
        {
            label :'Process Support',
            isHave : false,
            lowerMenu : [
                {
                    label : 'Process & FAQ',
                    value : 'faq',
                    path : '/process&support/faq',
                    isFavorite : true,
                    isHome : false
                },
                {
                    label : 'Request & QnA',
                    value : 'ticket',
                    path : '/',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'New Ticket',
                    value : 'ticket',
                    path : process.env.REACT_APP_US_ISSUE_TICKET,
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'Request History',
                    value : 'history',
                    path : '/',
                    isFavorite : true,
                    isHome : false
                },
            ]
        },
           {
             label :'Board',
             isHave : false,
            lowerMenu : [
                {
                    label : 'Notice',
                    value : 'notice',
                    path : '/board/notice',
                    isFavorite : false,
                    isHome : false
                },
                {
                    label : 'CS Talk',
                    value : 'cstalk',
                    path : '/board/cstalk',
                    isFavorite : false,
                    isHome : false
                },
            ] 
        }
    ])

    const getFavList = () =>{

    // var config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
    //         },
    //     };

    // fetchInstance('/userManagement/myFavorite',config)
    // .then(function (response) {
    //     let resData = response.data;
    //     if(resData.code===200) {
    //         console.log(resData)
    //         setUserPreference(resData.result)
    //     }else {
    //         console.log(resData)
    //     }
    // })
    // .catch(function (error) {
    //         console.log('error',error);
    // });
    }

    const onClickLink = (path) =>{
        window.location.assign(path)
    }

    useEffect(()=>{
        getFavList()
    },[openTab])

    useEffect(() => {
        if (userPreference !== null) {
          let copyMenu = [...menu];
          copyMenu.forEach((m) => {
            m.lowerMenu.forEach((lm) => {
              lm.isFavorite = userPreference.myFavorite.includes(lm.value);
              lm.isHome = userPreference.myHome.includes(lm.value);
            });
            m.isHave = m.lowerMenu.some((lm) =>
              userPreference.myFavorite.includes(lm.value)
            );
          });
          setMenu(copyMenu);
        }
      }, [userPreference]);
 
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);

      useEffect(()=>{
        if(favModal) {
            setOpenTab(false);
        }
      },[favModal])
    return (
        <>
        <Style open={openTab}>
            <div className={ `${openTab ? 'modal' : 'cursor-btn'}`} >
            <div className={`navigation-container ${openTab ? 'open' : 'closed'} `} ref={modalRef}>
                <div className="nav-top"><h1>Bookmark</h1></div>
                <div className="nav-middle">
                    <ul className="bookmark-list">
                        {
                            userPreference!==null &&
                            menu.map((item,idx)=>{
                               return(
                                    <Fragment key={generateRandomString(idx)}>
                                    {
                                        item.isHave &&
                                        <li > <div> · {item.label}</div>
                                            <ul>
                                                {
                                                    item.lowerMenu.map((i,index)=>{
                                                        return (
                                                            <Fragment key={generateRandomString(index)}>
                                                           { i.isFavorite &&  <li className="cursor-btn" onClick={()=>{onClickLink(i.path)}}>{i.label}</li>}
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    }
                                    </Fragment>
                               )
                            })
                        }
                    </ul>
                </div>
                <div className="nav-bottom custom-flex-item custom-align-item custom-justify-center cursor-btn" onClick={()=>setFavModal(true)}><img src={Setting} alt="nav-setting"/><p className="custom-stress-txt " >Setting</p></div>
            <div className={`tab-container custom-flex-item custom-justify-center custom-align-item  ${openTab ? 'open' : 'closed'}`} onClick={handleTab}>
                {!openTab ? ' My Favorite Quick' : <img src={Close} />}
            </div>
            </div>
            </div>

            {
                favModal
                &&
                <Favorite onClose={()=>setFavModal(false)} menu={menu} home={userPreference?.myHome}/>
            }
        </Style>
        </>
    )
}
export default Tab

const Style = styled.div`
.tab-container {
    background: ${(props)=> props.open? 'white' :'#323232'};
    box-shadow: ${(props)=> props.open? 'none' :'1px 1px 10px 0px rgba(0, 0, 0, 0.5);'}; 
}
`
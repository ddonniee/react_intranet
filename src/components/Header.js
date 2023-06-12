import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';

import Logo from '../assets/svgs/icon_logo.svg'
import Profile from '../assets/svgs/icon_profile.svg'
import Seeker from '../assets/svgs/icon_seeking.svg'
import Link from '../assets/svgs/icon_link.svg'
import Polygon from '../assets/svgs/icon_polygon.svg'

import { generateRandomString, outsideClickHandler } from '../utils/CommonFunction';

function Header() {

    const headerRef = useRef(null);
    const [currentTab, setCurrentTab] = useState({
        upperTab : 'support',
        lowerTab : ''
    })
    const [isOpenMenu, setIsOpenMenu] = useState(false); 

    const secondMenuList = [
        {id:'dashboard', name : 'Dashboard'},
        {id:'process-support', name : 'Process Support'} ,
        {id:'board', name: 'Board'},
        {id:'setting', name:'Setting & Admin'} 
    ]
    const [thirdMenuList, setThirdMenuList] = useState([])

    const handleClickTab = e => {
       
        let tabID = e.target.id;
        
        if(tabID==='support') {
        setIsOpenMenu(!isOpenMenu)
        setCurrentTab({
            ...currentTab,
            upperTab: tabID,
            lowerTab: ''
        });
        }else {
            setIsOpenMenu(false);
            clearState()
        }

        e.stopPropagation();
    }

    const handleClickLowerTab = e => {
        let thirdTab = '';
        if(e.target.tagName ==='P') {
            thirdTab = e.target.title
        }else {
            thirdTab = e.target.id;;
        }
        console.log(thirdTab)
        if(currentTab.lowerTab!==thirdTab) {
            setCurrentTab({
                ...currentTab,
                lowerTab:thirdTab
            })
        }else {
            setCurrentTab({
                ...currentTab,
                lowerTab:''
            })
        }
    }

    const handleClickLink = e => {
        
        let path = e.target.title;
        console.log(path)
        window.location.assign(process.env.REACT_APP_FRONT_URL+path)
    }

    const handleClickLogo = e => {
        window.location.assign(process.env.REACT_APP_FRONT_URL+'/')
    }
    const ThirdMenu = () => {
        return (
            <div className='nav-modal' ref={headerRef}>
                <img src={Polygon} alt='polygon' />
                <ul>
                    {
                        thirdMenuList.map((list,idx)=>{
                            return(
                                <li id={list.id} title={list.path} onClick={handleClickLink} key={generateRandomString(idx+3)}>{list.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const clearState=()=>{
        setCurrentTab({
            ...currentTab,
            upperTab: 'support',
            lowerTab:''
        })
        setThirdMenuList([])
    }
    

    useEffect(() => {

        const clickOutside = (e) => {
          // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
          if (currentTab.lowerTab!==''  && headerRef.current && !headerRef.current.contains(e.target)) {
            clearState();
          }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", clickOutside);
        };
      }, [currentTab.lowerTab]);

    useEffect(()=>{
            if(currentTab.lowerTab==='dashboard') {
            setThirdMenuList(
                [
                {name : 'KPI performance', id:'kpi-performance', path : '/dashboard/kpiperformance'},
                {name : 'Asc Holding Status', id:'asc-holding-status', path : '/dashboard/ascholdingstatus'},
                {name : 'Evaluation/Incentive', id:'evaluation-incentive', path : '/dashboard/evaluation'},
                {name : 'Individual Training', id:'individual-training', path : '/dashboard/individualtraining'},
                {name : 'Parts Delivery Time', id:'part-delivery-time', path : '/dashboard/partsdeliverytime'},
                {name : 'Training Status', id:'training-status', path : '/dashboard/trainingstatus'},
                {name : 'Work In Process', id:'work-in-process', path : '/dashboard/wip'},
            ])
            }else if(currentTab.lowerTab==='process-support') {
            setThirdMenuList(
                [
                {name : 'Process & FAQ', path : '/process&support/faq'},
                {name : 'Request & Q&A', path : '//process&support/raq'},
            ])
            }else if(currentTab.lowerTab==='board') {
                setThirdMenuList([
                    {name : 'Notice', path : '/board/cstalk'},
                    {name : 'CS Talk', path : '/board/notice'},
                ])
            }else if(currentTab.lowerTab==='setting') {
                setThirdMenuList([
                    {name : 'KPI Target Setting', path : '/setting/kpitarget'},
                    {name : 'Evaluation/Incentive Setting', path : '/setting/evaluation'},
                    {name : 'FAQ Setting', path : '/setting/faq'},
                    {name : 'Notice Setting', path : '/setting/notice'},
                    {name : 'Statistics', path : '/setting/statistics'},
                    {name : 'User Mangenent', path : '/setting/userMangenent'},
                    {name : 'Common Code Mangement', path : '/setting/commonCodeMangement'},
                ])
            }
        },[currentTab.lowerTab])
    
        useEffect(()=>{
            console.log(thirdMenuList)
        },[thirdMenuList])
        
    return (
        <Nav upperDepth={currentTab.upperTab} lowerDepth={currentTab.lowerTab} thirdDepth={thirdMenuList?.thirdMenuList}>
        <div className="top-nav" >
            <div className="nav-logo"><img src={Logo} alt='logo' onClick={handleClickLogo}/><div className='division'></div><p>CS PORTAL</p></div>
            <div className="nav-category">
                <ul className='nav-lists'>
                    <li id='support'  onClick={handleClickTab}>Support{currentTab.upperTab==='support' && <div className='nav-underline'></div>}</li>
                    <li id='business' onClick={handleClickTab}>Business<img className='link-icon' src={Link} alt='link' /><div className='nav-division'></div></li>
                    <li id='contents' onClick={handleClickTab}>Contents<img className='link-icon' src={Link} alt='link' /><div className='nav-division'></div></li>
                    <li id='training' onClick={handleClickTab}>Training<img className='link-icon' src={Link} alt='link' /><div className='nav-division'></div></li>
                </ul>
            </div>
            <div className="nav-info">
                <div className='profile'><div className='profile-circle'><img src={Profile} alt='user-profile'/></div></div>
                <div className='search'><img src={Seeker} alt='whole-search'/></div>
            </div>
        </div>

        {
            isOpenMenu 
            ?
            <div className='lower-tab'>
                <ul className='more-lists'>
                    {secondMenuList.map((item,idx)=>{
                        return (
                        <>
                        <li  id={item.id} onClick={handleClickLowerTab} key={generateRandomString(idx+3)} ><p title={item.id}>{item.name}</p>
                        {
                            currentTab.lowerTab === item.id
                            ?
                            <>
                            <ThirdMenu />
                            </>
                            :
                            null
                        }</li>
                        
                        </>
                        )
                    })}
                </ul>
            </div>
            :
            null
        }
        
        </Nav>
    )
}

export default Header

const Nav = styled.div`
    #${props=>props.upperDepth} {
        background-color: white; color: #BB0841; 
    }
    ${props => props.lowerDepth !== '' && `#${props.lowerDepth} > p { background : #FAF1F4; border-radius: 100px;}`}
    }
`


import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';

import Logo from '../assets/svgs/icon_logo.png'
import Profile from '../assets/svgs/icon_profile.svg'
import Seeker from '../assets/svgs/icon_seeking.svg'
import Link from '../assets/svgs/icon_link.svg'
import Polygon from '../assets/svgs/icon_polygon.svg'
import Hamburger from '../assets/svgs/icon_hamburger.svg'

import { generateRandomString, detectUserAgent } from '../utils/CommonFunction';

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

    /* ======================================================================================== */
    const dashboardMenuList = [
        // {name : 'KPI performance', id:'kpi-performance', path : '/dashboard/kpiperformance'},
        {name : 'Asc Holding Status', id:'asc-holding-status', path : '/dashboard/ascholdingstatus'},
        // {name : 'Evaluation/Incentive', id:'evaluation-incentive', path : '/dashboard/evaluation'},
        // {name : 'Parts Delivery Time', id:'part-delivery-time', path : '/dashboard/partsdeliverytime'},
        // {name : 'Training Status', id:'training-status', path : '/dashboard/trainingstatus'},
        // {name : 'Work In Process', id:'work-in-process', path : '/dashboard/wip'},
    ];
    const processMenuList = [
        {name : 'Process & FAQ', path : '/process&support/faq'},
        // {name : 'Request & Q&A', path : '/process&support/raq'},
    ];
    const boardMenuList = [
        // {name : 'Notice', path : '/board/notice'},
        {name : 'CS Talk', path : '/board/cstalk'},
    ];
    const settingMenuList = [
        // {name : 'KPI Performance Setting', path : '/setting/kpiperformance'},
        // {name : 'Evaluation/Incentive Setting', path : '/setting/evaluation'},
        {name : 'FAQ Setting', path : '/setting/faq'},
        // {name : 'Notice Setting', path : '/setting/notice'},
        // {name : 'Statistics', path : '/setting/statistics'},
        // {name : 'User Management', path : '/setting/userManagement'},
        // {name : 'Common Code Management', path : '/setting/commonCodeManagement'},
    ];
    const [showThirdMenu, setShowThirdMenu] = useState(false);
    /* ======================================================================================== */

    const handleClickTab = e => {
        let tabID = e.target.id;
        
        if(tabID==='support') {
        setIsOpenMenu(!isOpenMenu)
        setCurrentTab({
            ...currentTab,
            upperTab: tabID,
            lowerTab: ''
        });
        } else {
            setIsOpenMenu(false);
            clearState()
        }
        e.stopPropagation();
    }

    const handleClickLowerTab = e => {
        let thirdTab = '';
        if(e.target.tagName ==='P') {
            thirdTab = e.target.title
        } else {
            thirdTab = e.target.id;;
        }
        console.log(thirdTab)
        if(currentTab.lowerTab!==thirdTab) {
            setCurrentTab({
                ...currentTab,
                lowerTab:thirdTab
            })
        } else {
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

    /* ======================================================================================== */
    const ThirdMenu = () => {
        return (
            <div className='nav-third' ref={headerRef}>
                <div className='third-tab'>
                    <ul>
                        { dashboardMenuList?.map((list,idx)=>{
                            return (
                                <li id={list.id} title={list.path} onClick={handleClickLink} key={generateRandomString(idx)}>{list.name}</li>
                            )
                        })}
                    </ul>
                    <ul>
                        { processMenuList?.map((list,idx)=>{
                            return (
                                <li id={list.id} title={list.path} onClick={handleClickLink} key={generateRandomString(idx)}>{list.name}</li>
                            )
                        })}
                    </ul>
                    <ul>
                        { boardMenuList?.map((list,idx)=>{
                            return (
                                <li id={list.id} title={list.path} onClick={handleClickLink} key={generateRandomString(idx)}>{list.name}</li>
                            )
                        })}
                    </ul>
                    <ul>
                        { settingMenuList?.map((list,idx)=>{
                            return (
                                <li id={list.id} title={list.path} onClick={handleClickLink} key={generateRandomString(idx)}>{list.name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    const toggleThirdMenu = () => {
        setShowThirdMenu(!showThirdMenu);
    };
    /* ======================================================================================== */

    const handleClickProfile = () => {
        let loginCheck = 0;

        if(loginCheck===0) {
            document.location.href='/login';
        }
    }

    const clearState=()=>{
        setCurrentTab({
            ...currentTab,
            upperTab: 'support',
            lowerTab:''
        })
        setThirdMenuList([])
    }
    
    const handleClickHamburger = e => {
        console.log('handleClickHamburger')
    }

    useEffect(() => {
        const clickOutside = (e) => {
            // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
            if (headerRef.current && !headerRef.current.contains(e.target)) {
            clearState();
            setShowThirdMenu(false);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [currentTab.lowerTab]);

    useEffect(()=>{
        console.log(thirdMenuList)
    }, [thirdMenuList])

    const [isMobile, setIsMobile] = useState();
    
    const checkUserAgent = () => {
        let agent = detectUserAgent();
        setIsMobile(agent==='pc'?false:true)
    }

    useEffect(()=>{
        checkUserAgent()
    }, [])

        
    return (
        <Nav upperdepth={currentTab.upperTab} lowerdepth={currentTab.lowerTab} thirdDepth={thirdMenuList?.thirdMenuList} style={{position:'relative'}}>
        <div className="top-nav">
            <div className='top-nav-wrapper'>
                <div className="nav-logo" onClick={handleClickLogo}>
                    <img src={Logo} alt='logo'/>
                    <p>PORTAL SITE</p>
                </div>
                <div className="nav-category">
                    <ul className='nav-lists'>
                    <li id='support'  onClick={handleClickTab}>Support{currentTab.upperTab==='support' && <div className='nav-underline'></div>}</li>
                    <li id='business' onClick={handleClickTab}>Business<img className='link-icon' src={Link} alt='link' /><div className='nav-division'></div></li>
                    <li id='contents' onClick={handleClickTab}>Contents<img className='link-icon' src={Link} alt='link' /><div className='nav-division'></div></li>
                    <li id='training' onClick={handleClickTab}>Training<img className='link-icon' src={Link} alt='link' /><div className='nav-division'></div></li>
                </ul>
                </div>
                
                
                <div className="nav-info">
                    {
                        !isMobile
                        &&
                        <div className='profile' onClick={handleClickProfile}><div className='profile-circle'><img src={Profile} alt='user-profile'/></div></div>
                    }
                    {
                        isMobile
                        &&
                        <div className='ham_btn'><img src={Hamburger} alt='nav-btn' onClick={handleClickHamburger}/></div> 
                    }
                </div>
            </div>
        </div>

        {
            isOpenMenu 
            ?
            <ThirdMenu />
            :
            null
        }
        
        </Nav>
    )
}

export default Header

const Nav = styled.div`
    #${props => props.upperdepth} {
        background-color: white; 
        color: #323232; 
    }

    ${props => props.lowerdepth !== '' && `#${props.lowerdepth} > p { 
        background : #FAF1F4; border-radius: 100px;
    }`}
`


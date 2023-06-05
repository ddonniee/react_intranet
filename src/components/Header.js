import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import Logo from '../assets/svgs/icon_logo.svg'
import Profile from '../assets/svgs/icon_profile.svg'
import Seeker from '../assets/svgs/icon_seeking.svg'
import Link from '../assets/svgs/icon_link.svg'

function Header() {

    const [currentTab, setCurrentTab] = useState({
        upperTab : 'support',
        lowerTab : ''
    })
    const [isOpenMenu, setIsOpenMenu] = useState(false); 
    const [isOpenThird, setIsOpenThird] = useState(false);

    const handleClickTab = e => {
        let tabID = e.target.id;
        console.log(tabID)
        
        if(tabID==='support') {
        setIsOpenMenu(!isOpenMenu)
        setCurrentTab({
            ...currentTab,
            upperTab: tabID,
            lowerTab: ''
        });
        }else {
            setIsOpenMenu(false)
            clearState()
            // url 연결 추가
        }
    }
    

    const handleClickLowerTab = e => {
        let thirdTab = e.target.id;
        setCurrentTab({
            ...currentTab,
            lowerTab:thirdTab
        })
    }
    const ThirdMenu = () => {
        return (
            <div className='nav-modal'>
                <ul>
                    <li>dfs</li>
                    <li>dsfdsf</li>
                </ul>>
            </div>
        )
    }

    const clearState=()=>{
        setCurrentTab({
            ...currentTab,
            upperTab: 'support',
            lowerTab:''
        })
    }

    useEffect(()=>{
        if(currentTab.lowerTab!==''){
            setIsOpenThird(true)
        }else {
            setIsOpenThird(false)
        }
    },[currentTab])
    
    return (
        <Nav isSelected={currentTab.upperTab}>
        <div className="top-nav">
            <div className="nav-logo"><img src={Logo} alt='logo'/><div className='division'></div><p>CS PORTAL</p></div>
            <div className="nav-category">
                <ul className='nav-lists'>
                    <li id='support' onClick={handleClickTab}>Support{currentTab.upperTab==='support' && <div className='nav-underline'></div>}</li>
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
                    <li id='dashboard' onClick={handleClickLowerTab}>Dashboard</li>
                    <li id='process-support' onClick={handleClickLowerTab}>Process Support</li>
                    <li id='board' onClick={handleClickLowerTab}>Board</li>
                    <li id='setting' onClick={handleClickLowerTab}>Setting & Admin</li>
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
    #${props=>props.isSelected} {
        background-color: white; color: #BB0841; 
    }
`


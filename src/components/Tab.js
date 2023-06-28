import React,{useEffect, useRef, useState} from "react";
import { styled } from "styled-components";

import Close from '../assets/svgs/icon_closetab.svg'
import Setting from '../assets/svgs/icon_setting.svg'

import Favorite from "./Favorite";
const Tab = () => {

    const modalRef = useRef(null);
    const [openTab, setOpenTab] = useState(false);
    const [favModal, setFavModal] = useState(false);

    const handleTab = () =>{
        console.log('handleTab')
        setOpenTab(!openTab)
    }

    const handleOutsideClick = (e) => {
        console.log('modalRef')
        if (modalRef.current && !modalRef.current.contains(e.target)) {
         setOpenTab(false)
        }
      }; 

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
            <div className={ `${openTab ? 'modal' : ''}`} >
            <div className={`navigation-container ${openTab ? 'open' : 'closed'} `} ref={modalRef}>
                <div className="nav-top"><h1>Bookmark</h1></div>
                <div className="nav-middle">
                    <ul>
                        <li>

                        </li>
                    </ul>
                </div>
                <div className="nav-bottom custom-flex-item custom-align-item custom-justify-center" onClick={()=>setFavModal(true)}><img src={Setting} alt="nav-setting"/><p className="custom-stress-txt">Setting</p></div>
            <div className={`tab-container custom-flex-item custom-justify-center custom-align-item  ${openTab ? 'open' : 'closed'}`} onClick={handleTab}>
                {!openTab ? ' My Favorite Quick' : <img src={Close} />}
            </div>
            </div>
            </div>

            {
                favModal
                &&
                <Favorite onClose={()=>setFavModal(false)}/>
            }
        </Style>
        </>
    )
}
export default Tab

const Style = styled.div`
.tab-container {
    background: ${(props)=> props.open? 'white' :'#BB0841'};
    box-shadow: ${(props)=> props.open? 'none' :'1px 1px 10px 0px rgba(187, 8, 65, 0.36);'}; 
}
`
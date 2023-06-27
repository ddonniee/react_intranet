import React,{useState,useEffect} from "react";

import Favorite from "./Favorite";

const Tab = props => {

    const [settingModal, setSettingModal] = useState(false);

    return (
        <>
        <div className="tab-container custom-flex-item custom-justify-center custom-align-item">My Favorite Quick</div>
        </>
    )
}
export default Tab
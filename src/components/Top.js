import React , {useEffect,useState} from "react";
import { useLocation } from 'react-router-dom'
import _paths from "../_paths";

import SelectBox from "./SelectBox";

// icon
import Search from '../assets/svgs/icon_seeking.svg'
import Home from '../assets/svgs/icon_home.svg'
const Top = props =>{
    
    const {auth, options, handleChange} = props;
    const [title, setTitle] = useState('');

    console.log(auth, options, handleChange)
    const location = useLocation();
    
    const [pagePath, setPagePath] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        const matchingPath = _paths.find((path) => path.path === currentPath);
        if (matchingPath) {
        setPagePath(matchingPath.to);
        setTitle(matchingPath.name)
        } else {
        setPagePath('');
        }
    }, [location]);
            
    return(

        <div className="title-wrapper">
            
            {
                auth &&
                <div className="search-area">
                <div>· Subsidiary</div>
                <SelectBox options={options} handleChange={handleChange} />
                <div>· Search</div>
                <input />
                <div className="search-wrapper"><img src={Search} alt='search-btn'/></div>
            </div>
            }

            <div className="page-title-area" style={!auth ? {textAlign:'center'}:null}>{title}</div>

            <div className="page-path-area"><img src={Home} alt='home'/>{pagePath} <p className="bold-title">{title}</p></div>
        </div>
    )
}
export default Top;
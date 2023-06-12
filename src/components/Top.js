import React , {useEffect,useState} from "react";
import { useLocation } from 'react-router-dom'
import _paths from "../_paths";

import SelectBox from "./SelectBox";

// icon
import Search from '../assets/svgs/icon_seeking.svg'
import Home from '../assets/svgs/icon_home.svg'
/**
 * 
 * @param {auth : 권한체크(하여 search 영역 보여줌, options :searchArea true시 select 박스에 들어가는 옵션, handleChange : select시 일어나는 event, searchArea (boolean) : true 시 options와 handleChange 콜백함수 전달 필수)} props 
 * @returns 
 */
const Top = props =>{
    
    const {auth, options, handleChange, searchArea} = props;
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
                (auth && searchArea ) && 
                <div className="search-area">
                <div>· Subsidiary</div>
                <SelectBox options={options} handleChange={handleChange} />
                <div>· Search</div>
                <input />
                <div className="search-wrapper"><img src={Search} alt='search-btn'/></div>
            </div>
            }

            <div className={`page-title-area ${!searchArea ? 'custom-txt-align' : ''}`} style={!auth ? {textAlign:'center'}:null}>{title}</div>

            <div className="page-path-area"><img src={Home} alt='home'/>{pagePath} <p className="bold-title">{title}</p></div>
        </div>
    )
}
export default Top;
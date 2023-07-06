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
    
    const {auth, options, handleChange, searchArea, onChange, onClick} = props;
    const [title, setTitle] = useState('');

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

        <div className={title === 'Main' ? 'title-wrapper title-main-wrapper' : 'title-wrapper'}>
            <div className="title-inner">
            {
                (auth && searchArea ) 
                ?
                <div className="search-area">
                <div>· Subsidiary</div>
                <SelectBox options={options} handleChange={handleChange} placeholder='Select'/>
                <div>· Search</div>
                <input className="top-input" onChange={onChange}/>
                <div className="search-wrapper" onClick={onClick}><img src={Search} alt='search-btn'/></div>
                </div>
                : 
                null
                // <div className="empty_area">
                // </div>
            }
            {
                title === 'Main'
                ? null
                :
                <div className={`page-title-area ${!searchArea ? 'custom-txt-align' : ''}`} style={!auth ? {textAlign:'center'}:null}>{title}</div>
            }
            </div>

            <div className="page-path-area"><img src={Home} alt='home'/>{pagePath} <p className="bold-title">{title}</p></div>
        </div>
    )
}
export default Top;
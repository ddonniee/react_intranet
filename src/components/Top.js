import React , {useEffect,useState} from "react";
import { useLocation } from 'react-router-dom'
import _paths from "../_paths";

import SelectBox from "./SelectBox";

// icon
import Search from '../assets/svgs/icon_seeking.svg'
import Home from '../assets/svgs/icon_home.svg'
import { ReactComponent as SearchIcon } from '../assets/svgs/icon_seeking.svg';
/**
 * 
 * @param {
 * auth : 권한체크하여 search 영역 보여줌, 
 * options : searchArea true시 select 박스에 들어가는 옵션, 
 * handleChange : select시 일어나는 event, 
 * searchArea (boolean) : true 시 options와 handleChange 콜백함수 전달 필수
 * } props 
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

        <div className={`title-wrapper${ title === 'Main' ? ' title-main-wrapper' : title === 'CS Talk' || title === 'Notice' || title === 'Notice Setting' || title === 'Process & FAQ' ? ' title-board-wrapper' : '' }`}>
            <div className="title-inner">
            {/* {
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
            } */}
            {
                title === 'Main'
                ? null
                :
                <div className={`page-title-area ${!searchArea ? 'custom-txt-align' : ''} ${title === 'CS Talk' || title === 'Notice' || title === 'Notice Setting' || title === 'Process & FAQ' ? 'page-board-title-area' : ''}`} style={!auth ? {textAlign:'center'}:null}>{title}</div>
            }
            </div>

            <div className="path-inner">
                <div className="page-path-area">
                    <img src={Home} alt='home'/>{pagePath} <p className="bold-title">{title}</p>
                </div>
                {
                    ( auth && searchArea ) 
                    ?
                    <div className="title-nav">
                        <div className="title-nav-box custom-flex-item custom-align-item">
                            <p>· Subsidiary</p>
                            <SelectBox options={options} handleChange={handleChange} placeholder="Select" />
                        </div>
                        <div className="custom-flex-item custom-align-item">
                            <p>· Search</p>
                            <input type="text" className="title-nav-input" id="title-nav-input" onChange={onChange}></input>
                            <button className="title-nav-btn custom-flex-item custom-align-item" onClick={onClick}> <SearchIcon /> </button>
                        </div>
                    </div>
                    : 
                    null
                }
            </div>
        </div>
    )
}
export default Top;
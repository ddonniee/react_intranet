import React , {useEffect,useState} from "react";
import { useLocation } from 'react-router-dom'
import _paths from "../_paths";
// icon
import Search from '../assets/svgs/icon_seeking.svg'
import Home from '../assets/svgs/icon_home.svg'
const Title = props =>{
    
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

        <div className="title-wrapper">
            
            <div className="search-area">
                <div>· Subsidiary</div>
                <input type="text" />
                <div>· Search</div>
                <input />
                <div className="search-wrapper"><img src={Search} alt='search-btn'/></div>
            </div>

            <div className="page-title-area">{title}</div>

            <div className="page-path-area"><img src={Home} alt='home'/>{pagePath} <p className="bold-title">{title}</p></div>
        </div>
    )
}
export default Title;
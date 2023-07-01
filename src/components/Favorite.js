import React, {useState, useEffect} from "react";

import { generateRandomString, axiosJsonInstance } from "../utils/CommonFunction";
import Close from '../assets/svgs/icon_close.svg'
import Fav from '../assets/svgs/icon_fav.svg';
import NonFav from '../assets/svgs/icon_non_fav.svg';
import Main from '../assets/svgs/icon_setting_home.svg';
import NonMain from '../assets/svgs/icon_none_home.svg'
import Alert from "./Alert";

const Favorite = props => {

    const {onClose} = props;

    console.log(props)

    const [menu, setMenu] = useState(props.menu)
 
    console.log(menu)
    const [alertModal, setAlertModal] = useState(false)
    
    const [alertTxt, setAlertTxt] = useState('');
    
    const handleClickLink = e => {
        
        let path = e.target.title;
        console.log(path)
        // window.location.assign(process.env.REACT_APP_FRONT_URL+path)
    }
    const [data,setData] = useState({
        myFavorite : [],
        myHome : props.home
    })

       const onSaveFavorite = e => {

        console.log(data,'============================dfdawsfdsfsdfsdf')
        const formData = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
              formData.append(key, data[key]);
            }
        }
        
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
                },
            data : formData
            };
    
        axiosJsonInstance('/userManagement/updateMyFavorite',config)
        .then(function (response) {
            let resData = response.data;
            if(resData.code===200) {
                console.log(resData,'======')
                onConfirmSave(2);
            }else {
                console.log(resData)
            }
        })
        .catch(function (error) {
                console.log('error',error);
        });
    }
  

    useEffect(()=>{
        let arr = [...menu];
        let tempArr = [];
        arr.forEach((item)=>{
            item.lowerMenu.forEach((lm)=>{
                lm.isFavorite && tempArr.push(lm.value);
            })
        })
        setData({
            ...data,
            myFavorite :tempArr
        })
    },[menu])

    useEffect(()=>{
        console.log('data',data)
    },[data])
    const onChangeFav = (value,index,idx) =>{
        // let arr = [...data]
        // const index = arr.indexOf(value);
        // if (index > -1) {
        //   arr.splice(index, 1);
        // } else {
        //   arr.push(value);
        // }
        // setData(arr);
        let arr = [...menu]
        console.log('value,index,idx',arr[index].lowerMenu[idx].value)

        if(arr[index].lowerMenu[idx].isFavorite) {
            arr[index].lowerMenu[idx].isFavorite = false
        }else  {
            arr[index].lowerMenu[idx].isFavorite = true
        }
        setMenu(arr)
    }


    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })

    const onConfirmSave = (num) =>{
        if(num===1) {
            setAlertSetting({
                alertTxt : 'Do you want to set the selected menu as the first screen?',
                onConfirm :()=>{onSaveFavorite(); onClose()},
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : 'Success to change your preferences.'
            })
        }else if(num===2) {
            setAlertSetting({
                alertTxt : 'Saved your preferences',
                isDoubleBtn : false,
                btnTxt : 'Close',
                confirmTxt : ''
            })
        }
    }
    useEffect(()=>{
        if(alertSetting.alertTxt!=='') {
            setAlertModal(true)
        }
    },[alertSetting])
    
    useEffect(()=>{
        !alertModal && 
        setAlertSetting({ 
            alertTxt : '',
            onConfirm : function() {},
            isDoubleBtn : false,
            btnTxt : 'Close',
            confirmTxt : ''
        })
    },[alertModal])

    const onChangeMain = (index, idx, value) => {
        console.log('onChangeMain');
        let arr = [...menu]
        if(data.myHome===value) {
            arr[index].lowerMenu[idx].isHome = false;
            setData({
                ...data,
                myHome : ''
            })
        }else {
            arr.map(item=>{
                item.lowerMenu.map(lw=>{
                    lw.isHome = false
                })
            })
            arr[index].lowerMenu[idx].isHome = true;
            setData({
                ...data,
                myHome: value,
            })
            setMenu(arr)
        }
    } 


    return (
        <>
            <div className="modal">
                <div className="favorite-content custom-flex-item custom-justify-between">
                    <div className="favorite-top custom-flex-item custom-justify-between">
                        <div className="custom-flex-item">
                            <span>My Favorite</span>
                            <span>Select to add the menu to My Favorites.When you enable home, you can select the first screen at login.</span>
                        </div>
                        <img src={Close} alt="close-btn" onClick={onClose} />
                    </div>
                    <div className="favorite-middle">
                        <ul className="custom-flex-item custom-justify-between upper-menu">
                        {
                            menu.map((item,index)=>{
                                return (
                                    <li className={`${item.label}-list`} key={generateRandomString(index)}>
                                        · {item.label}
                                        <ul>
                                        {item.lowerMenu.map((lw,idx)=>{
                                            return (
                                                <li key={generateRandomString(idx)} title={lw.path} onClick={handleClickLink}><img src={lw.isFavorite ? Fav : NonFav} onClick={()=>onChangeFav(lw.value,index,idx)} alt="fsv-btn" className="cursor-btn"/><span>{lw.label}</span><img src={lw.value === data.myHome ? Main : NonMain} onClick={()=>onChangeMain(index, idx, lw.value)} alt="user-custom-main-btn" className="cursor-btn"/></li>
                                            )
                                        })}
                                        </ul>
                                    </li>
                                )   
                            })
                        }
                        </ul>
                    </div>
                    <div className="favorite-bottom">
                        <button onClick={onClose} className="cancel-btn">Cancel</button>
                        <button onClick={()=>onConfirmSave(1)} className="primary-red-btn">Save</button>
                    </div>
                </div>
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
        </>
    )
}

export default Favorite
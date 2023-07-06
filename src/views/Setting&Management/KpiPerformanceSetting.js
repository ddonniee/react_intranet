import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { axiosInstance, axiosJsonInstance } from '../../utils/CommonFunction';
import readXlsxFile from 'read-excel-file';

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import Alert from '../../components/Alert';
import Tab from '../../components/Tab';

import SelectBox from '../../components/SelectBox';
import { UserContext } from "../../hooks/UserContext";

import '../../scss/style.scss';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';
import { ReactComponent as UploadIcon } from '../../assets/svgs/icon_upload.svg';

function KpiPerformanceSetting() {

    /**
     * 화면 접근 권한
     * 
     * 본사 staff    (LK)  : 조회만 가능
     * 법인관리자    (SS)  : N/A
     * 법인 admin    (SA)  : 조회 & 작성
     * LGC 관리자    (LD)  : N/A
     * LGC Engineer  (LE)  : N/A
     * ASC 관리자    (AD)  : N/A
     * ASC Engineer  (AE)  : N/A
     */

    // 로그인유저 정보
    const user = useContext(UserContext);
    const [token, setToken] = useState('LGEKR');
    const [auth, setAuth] = useState({
        isViewer : user.role === 'LK' || user.role === 'SA' ? true : false,
        isWriter : user.role === 'SA' ? true : false,
    })

    useEffect(() => {
        console.log('login user', user)

        if(!auth.isViewer) {
            alert('No right to Access')
            document.location.href='/login';
        }
    }, [])

    const USER_CORP_CODE = 'LGEAI' // 로그인유저 법인코드
    const USER_CENTER_TYPE = 'ASC' // 로그인유저 센터타입

    const config = { // axios header
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
        }
    }

    /* 검색 영역 ****************************************************************/
    const [searchData, setSearchData] = useState(); // 검색데이터

    const [subOptions, setSubOptions] = useState([]); // 법인 selectbox 데이터
    const [yearOptions, setYearOptions] = useState([
        { value: '2023', label: '2023', group: 'executionYear' },
        { value: '2022', label: '2022', group: 'executionYear' },
        { value: '2021', label: '2021', group: 'executionYear' },
    ]); // 연도 selectbox 데이터

    const handleSelectBox = (e) => {
        console.log('select ---->', e)
        let group = e.group;
        let value = e.value;

        if(group === 'corporationCode') {
            setSearchData({ ...searchData, corporationCode: value })
        } else if(group === 'executionYear') {
            setSearchData({ ...searchData, year: value })
        }
    }

    const getSelectList = () => {
        // 법인목록 조회 API
        const corpForm = new FormData();

        axiosInstance.post('/corporation/list', corpForm, config).then(res => {
            const data = res?.data.result;

            const newArray = data.map((obj, index) => ({
                value: obj.corporationCode,
                label: obj.corporationCode,
                group: 'corporationCode'
            }));
            console.log('법인 목록 ---->', newArray)

            setSubOptions(newArray);
            
        }).catch(error => {
            console.error(error);
        });
    }

    /* 조회 영역 ****************************************************************/
    const [alertModal, setAlertModal] = useState(false)
    const [alertTxt, setAlertTxt] = useState('')

    const getList = (search) => {
        const formData = new FormData();

        if(searchData?.corporationCode && searchData?.year) {
            formData.append('corporationCode', searchData?.corporationCode);
            formData.append('executionYear', searchData?.year);
        } else {
            return false;
        }
        let data = undefined;
        if(searchData) data = formData;

        console.log('kpi download --->', data)

        // KPI 다운로드 API
        // axiosInstance.post('/userManagement/list', search, config).then(res => {
        //     const array = res?.data.result;
        //     console.log('사용자 목록 ---->', array)

        //     const newArray = array.map((obj, index) => ({
        //         ...obj,
        //         id: index + 1
        //     }));
        //     setRowData(newArray);
        //     setOriginData(array);
            
        // }).catch(error => {
        //     console.error(error);
        // });
    }

    useLayoutEffect(() => {
        // getList();
        getSelectList();
    }, []);

    const [excelData, setExcelData] = useState(null);
    const [excelError, setExcelError] = useState(null);

    const handleExcelUpload = (event) => {
        const file = event.target.files[0];
        // console.log('input file ============', file)

        const allowedFileTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        if(!allowedFileTypes.includes(file.type)) {
            setAlertTxt('Only Excel files can be uploaded.')
            return false;
        }

        readXlsxFile(file)
          .then((rows) => {
            setExcelData(rows);
            setExcelError(null);
          })
          .catch((error) => {
            setExcelError(error.message);
            setExcelData(null);
          });
    };

    useEffect(()=>{
        if(!alertModal) {
            setAlertTxt('')
        }
    },[alertModal])

    useEffect(()=>{
        if(alertTxt!==''){
            setAlertModal(true)
        }
    },[alertTxt])

    const [confirm, setConfirm] = useState(false); // final confirm 여부

    return (
        <div className="kpisetting-container">
            <Header />
            <div className="inner-container">
                {/** auth 권한체크로 수정 필요 */}
                <Top auth={1} searchArea={false}/>
                <div className='kpi-nav'>
                    <div className='nav-header'>1. KPI Target Format Download</div>
                    <div className='nav-left'>
                        <div className='nav-line'></div>
                        <div className='custom-flex-item custom-align-item custom-justify-between nav-search'>
                            <div className='custom-flex-item custom-align-item custom-justify-between nav-search-box'>
                                <p>· Subsidiary</p>
                                <SelectBox name='corporationCode' options={subOptions} handleChange={handleSelectBox} />
                            </div>
                            <div className='custom-flex-item custom-align-item custom-justify-between nav-search-box'>
                                <p>· Execution Year</p>
                                <SelectBox name='executionYear' options={yearOptions} handleChange={handleSelectBox} />
                            </div>
                        </div>
                    </div>
                    <div className='nav-right'>
                        <div className='nav-line'></div>
                        <button className='custom-circle-btn' onClick={getList} >
                            <p style={{padding: "25px 0 0 0"}}>Download <br/>Total KPI</p>
                            <IntersectIcon />
                        </button>
                    </div>
                </div>
                <div className='kpi-nav'>
                    <div className='nav-header'>2. KPI format Upload</div>
                    <div className='nav-left'>
                        <div className='nav-line'></div>
                        <input type="text" className="txt-input attach-input" name="filename" id="filename" readOnly></input> 
                        <label className="custom-flex-item custom-justify-center custom-align-item file-select-btn" 
                            htmlFor={`file-select-btn`}>Browse</label>
                        <input 
                            type="file" 
                            className="file-select-btn" 
                            style={{display: "none"}} 
                            id={`file-select-btn`}
                            onChange={(e) => { 
                                if (e.target?.files[0]) {
                                    const file = e.target?.files[0];
                                    // console.log('input file type ============', file.type)

                                    if(file.size > 1024 * 1024 * 20) {
                                        setAlertTxt('Only files of 20MB or less can be attached.')
                                        return false;
                                    }
                                    const allowedFileTypes = [
                                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                    ];
                                    if(!allowedFileTypes.includes(file.type)) {
                                        setAlertTxt('Only Excel files can be uploaded.')
                                        return false;
                                    }
                        
                                    let formdata = new FormData();
                                    formdata.append("uploadFiles", file);
                                    formdata.append("directoryType", 'notice');
                        
                                    // 파일업로드 API 호출
                                    axiosInstance.post('/fileUpload', formdata).then(res => {
                                        let resData = res.data;
                                        // console.log('idx ---->', idx)

                                        if (resData.code == 500) {
                                            alert(resData.msg)
                                        } else {
                                            document.getElementById('filename').value = resData.result[0].fileName;
                                            console.log('file res --->', resData.result[0])
                                        }
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                }
                            }}
                        />
                    </div>
                    <div className='nav-right'>
                        <div className='nav-line'></div> 
                        <button className='custom-circle-btn' onClick={getList} >
                            <p>Upload</p>
                            <UploadIcon />
                        </button>
                    </div>
                </div>
                <div className='kpi-nav' style={{height: "532px"}}>
                    <div className='nav-header'>3. Pre check</div>
                    <div className='nav-left nav-check'>
                        <div className='nav-line'></div>
                        {/* <button className="nav-btn-black">Pre Check</button> */}
                        <div className='pc-check-wrapper'>
                            <label className="custom-flex-item custom-justify-center custom-align-item nav-btn-black" 
                                htmlFor="excel-select-btn">Pre Check</label>
                            <input 
                                type="file" 
                                className="excel-select-btn" 
                                style={{display: "none"}} 
                                id="excel-select-btn"
                                onChange={handleExcelUpload}
                            />
                            <p>· Error</p>
                            <input type="text" className="txt-input error-input" name="errcount" id="errcount" readOnly></input>
                            <div className="custom-flex-item custom-align-item custom-justify-between pc-check-result">
                                <p>· Score Mistake : </p> <p>{'24'}</p>
                            </div>
                            <div className="custom-flex-item custom-align-item custom-justify-between pc-check-result">
                                <p>· Format Miss : </p> <p>{'14'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='nav-right nav-check'>
                        { excelError && <div>Error: {excelError}</div>}
                        { excelData && (
                            <div className='pc-table-wrapper'>
                                <table className='pc-table'>
                                    <colgroup>
                                        <col width="*"/>
                                        <col width="16%"/>
                                        <col width="16%"/>
                                        <col width="16%"/>
                                        <col width="16%"/>
                                        <col width="16%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                        { excelData[0].map((header, index) => (
                                            <th key={index} className='pc-table-th'>{header}</th>
                                        ))}
                                            <th className='pc-table-th'>Error</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { excelData.slice(1).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            { row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className='pc-table-td'>{cell}</td>
                                            ))}
                                            <td className='pc-table-td'>Format</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <div className='kpi-nav'>
                    <div className='nav-header'>4. Final Confirm</div>
                    <div className='nav-left'>
                        <div className='nav-line'></div>
                        <p className='confirm-txt'>
                            {confirm ? 'Upload Success' : 'No data errors were found. Do you want to confirm it?'}</p>
                    </div>
                    <div className='nav-right'>
                        <div className='nav-line'></div>
                        <button className='custom-circle-btn' onClick={getList} >
                            <p style={{padding: "0"}}>Confirm</p>
                        </button>
                    </div>
                </div>

                <Zendesk />
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertTxt} onClose={()=>setAlertModal(false)} onConfirm={()=>setAlertModal(false)} btnTxt='Close' />
            }
            <Tab />
        </div>
    )
}

export default KpiPerformanceSetting
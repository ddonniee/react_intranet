import { useContext, useState, useEffect } from "react"
import { styled } from "styled-components"

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import Pagination from "react-js-pagination"
import CustomDatePicker from "../../components/DatePicker"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 

import { generateRandomString } from "../../utils/CommonFunction"

import '../../scss/style.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_seeking.svg';
import { ReactComponent as SpeakerIcon } from '../../assets/svgs/icon_speaker.svg';
import { ReactComponent as NewIcon } from '../../assets/svgs/icon_new.svg';
import { ReactComponent as MoreIcon } from '../../assets/svgs/icon_more.svg';
import { ReactComponent as CalendarIcon } from '../../assets/svgs/icon_calendar.svg';

function NoticeSetting() {

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수

    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
    };
    /** 페이징 관련 ▲ ============================================================= */

    const [boardData, setBoardData] = useState([
        {
            num : '001',
            title : `R007 - Used Parts Q'ty larger than avaliable`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
            top : true,
        },
        {
            num : '002',
            title : `What is LG Electronics' credit rating?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '003',
            title : `How do I sign up to receive regular Investor Relations (IR) email updates?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '004',
            title : `Which reporting convetion does LGE use when posting its finantial information?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '005',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '006',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '007',
            title : `R007 - Used Parts Q'ty larger than avaliable`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '008',
            title : `How do I sign up to receive regular Investor Relations (IR) email updates?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '009',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '010',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...e`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
    ]);

    const [detail, setDetail] = useState({
        title : 'Invest In LG Electronics',
        writer : 'Paul_Chapin',
        date : 'Paul_Chapin',
        type : 'All',
        attachment : 'Guide for CB03.pptx (531KB)',
        content : 'How',
        comments : [
            { 
            writer : 'writer',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            },
            { 
            writer : 'writer',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            },
            { 
            writer : 'writer',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            }
        ],
        like : 11,
        dislike : 7,
    })

    const [content, setContent] = useState('<h1>How can I invest in LG Electronics? On which exchange is LG Electronics listed and what ard te ticker symbols ?</h1><p>LG Electronics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla  Suspendisse cursus ullamcorper justo, at cursus magna efficitur id. Mauris ac malesuada velit. Fusce scelerisque fringilla elit id gravida. Phasellus ut nulla sem. Etiam ac condimentum erat, ac dictum tellus.</p>');

    const [selectedList, setSelctedList] = useState({ num: null, title: '' });

    const handleClickRow = (e, item) => {
        if(selectedList.num === null || selectedList.num !== item.num) {
            setSelctedList(item)
        }else {
            setSelctedList({ num: null, title: '' })
        }
    }

    useEffect( ()=> {
        console.log(selectedList)
    }, [selectedList])

    const viewOptions = [
        { value: 'ASC', label: 'ASC' },
        { value: 'ASC2', label: 'ASC2' },
    ]

    const handleSelectBox = (event,params) => {
        const { data } = params.node;
        const { checked } = event.target;

        if (checked) {
            setBoardData([...boardData, data]);
          } else {
            setBoardData(boardData.filter(item => item !== data));
          }
    }

    const [isWrite, setIsWrite] = useState(false);

    const [txt, setTxt] = useState('');

    return (
        <div className="notice-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div className="notice-nav">
                {/* <div className="nav-left"> */}
                <div className="notice-nav-box custom-flex-item custom-align-item">
                    <p>· Subsidiary</p>
                    <input type="text" className="notice-nav-input"></input>
                </div>
                <div className="custom-flex-item custom-align-item">
                    <p>· View</p>
                    <SelectBox options={viewOptions} onChange={handleSelectBox} />
                </div>
                <div className="custom-flex-item custom-align-item">
                    <p>· Search</p>
                    <input type="text" className="notice-nav-input"></input>
                    <button type="submit" className="notice-nav-btn custom-flex-item custom-align-item"> <SearchIcon /> </button>
                </div>
                {/* </div> */}
            </div>

            {/** Content Area */}
            <Style selectId={selectedList.num}>
            <div className="notice-content">
                <div className="notice-left">
                    <div className="notice-count">
                        Total <span>{boardData.length}</span>
                    </div>
                    <ul className="notice-custom-board">
                        {
                            boardData?.map((item,idx) => {
                                return(
                                    <li className="notice-list" key={generateRandomString(idx)} id={`list-item-${item.num}`} onClick={(e)=>handleClickRow(e,item)}>
                                        <div className="title">
                                            {item.top ? <SpeakerIcon /> : null} {item.title} {item.top ? <NewIcon /> : null}
                                        </div>
                                        <div className="etc">
                                            <p>{item.writer}</p> <p>{item.date}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        boardData &&
                        <Pagination 
                            activePage={activePage} // 현재 페이지
                            itemsCountPerPage={itemsPerPage} // 한 페이지 당 보여줄 아이템 수
                            totalItemsCount={boardData?.length} // 총 아이템 수
                            pageRangeDisplayed={5} // paginator의 페이지 범위
                            prevPageText={"‹"} // "이전"을 나타낼 텍스트
                            nextPageText={"›"} // "다음"을 나타낼 텍스트
                            onChange={setPage} // 페이지 변경을 핸들링하는 함수
                        />
                    }
                    <div className="notice-bottom">
                        <button className="notice-btn-circle" onClick={() => setIsWrite(true)}>Write</button>
                    </div>
                </div>
                <div className="notice-right">
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Writer</p> </div>
                        <div className="right"> <input type="text" className="notice-write-input"></input> </div>
                    </div>
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Date</p> </div>
                        <div className="right"> <input type="text" className="notice-write-input"></input> </div>
                    </div>
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Release to</p> </div>
                        <div className="right radio-row custom-flex-item"> 
                            <label id="custom-label">
                                <input className="hiddenRadio" type="radio" name="release" value="1" />
                                <div className="showRadio"></div>
                                <span>All</span>
                            </label>
                            <label id="custom-label">
                                <input className="hiddenRadio" type="radio" name="release" value="2" />
                                <div className="showRadio"></div>
                                <span>LGC</span>
                            </label>
                            <label id="custom-label">
                                <input className="hiddenRadio" type="radio" name="release" value="3" />
                                <div className="showRadio"></div>
                                <span>ASC</span>
                            </label>
                        </div>
                    </div>
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Period</p> </div>
                        <div className="right">
                            <CustomDatePicker isDuration={true} />
                        </div>
                    </div>
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Subject</p> </div>
                        <div className="right"> <input type="text" className="notice-write-input"></input> </div>
                    </div>
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Detail</p> </div>
                        <div className="right"> 
                            {/* <input type="text" className="notice-write-input"></input>  */}
                            <CKEditor
                                editor={ ClassicEditor }
                                data="<p>Hello from CKEditor 5!</p>"
                                // config={editorConfig}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    const dbTxt = encodeURIComponent(data)
                                    setTxt(dbTxt)
                                    console.log( { txt, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                        </div>
                    </div>
                    <div className="notice-write-row">
                        <div className="left custom-flex-item custom-align-item"> <p>· Attachments</p> <MoreIcon /> </div>
                        <div className="right"> 
                            <input type="text" className="notice-write-input notice-attach-input"></input> 
                            <button className="file-delete-btn">Delete</button>
                            <p className="attach-desc">Attached files can only be in PDF, HWP, Docx, xls, and PPT formats (Support up to 100MB)</p>
                        </div>
                    </div>
                    <div className="notice-btn-row">
                        <button className="notice-btn-white">Delete</button>
                        <div>
                            <button className="notice-btn-black">Cancel</button>
                            <button className="notice-btn-red">Save</button>
                        </div>
                    </div>
                </div>
                {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    // config={editorConfig}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        const dbTxt = encodeURIComponent(data)
                        setTxt(dbTxt)
                        console.log( { txt, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> */}
            </div>
            </Style>

            <Zendesk />
        </div>
        </div>
    )
}

export default NoticeSetting

const Style = styled.div`
    #list-item-${props => props.selectId} {
        background : #FAF1F4;
    }
    #list-item-${props => props.selectId} .title {
        color : #BB0841;
    }
`
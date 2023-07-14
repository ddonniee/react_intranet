import { useContext, useState, useEffect, useLayoutEffect } from "react"
import moment from "moment/moment";

import Viewer from "../components/Viewer"

import { generateRandomString, downloadAttachment, convertFileSize } from "../utils/CommonFunction"

import '../scss/style.scss';
import { ReactComponent as AttachmentIcon } from '../assets/svgs/icon_attachment.svg';
import { ReactComponent as DownloadIcon } from '../assets/svgs/icon_download.svg';
import { ReactComponent as ScreenIcon } from '../assets/svgs/icon_screen.svg';
import { ReactComponent as CloseIcon } from '../assets/svgs/icon_close2.svg';

const BoardPopup = ({ detail, attachments, onClose, onMinimizing }) => {

    return (
        <div className="modal">
            <div className="board-popup">
                {/* <div className="popup"> */}
                    {
                        detail ?
                        <div className="board-view">
                        <div className="board-view-top">
                            <div className="board-btn-area custom-flex-item custom-align-item custom-justify-between">
                                <button className="board-minimize-btn" onClick={onMinimizing}>
                                    <ScreenIcon className="screen-icon" /> Exit Full Screen
                                </button>
                                <CloseIcon onClick={onClose} />
                            </div>
                            <p className="board-title">{detail?.title}</p>
                            <p className="board-title-detail">
                                <span>Writer</span> : {detail?.writerName} &nbsp;
                                <span>Date</span> : {moment(detail?.createdAt).format(`'DD.MM.YY`)} &nbsp;
                                <span>Type</span> : {detail?.view}
                            </p>
                            <div className="board-title-attach">
                                <span className="custom-flex-item custom-align-item">
                                    <div className="custom-flex-item custom-align-item custom-flex-wrap">
                                    {
                                        attachments ?
                                        attachments.map((file, idx) => {
                                            return (
                                                <span className="board-attach-box" key={generateRandomString(idx)} onClick={() => downloadAttachment(file.uploadPath)}> 
                                                    <AttachmentIcon className="attach-icon" />
                                                    <p>{`${file.fileName} ${file?.fileSize ? `(${convertFileSize(file.fileSize)})` : ''}`}</p>
                                                    <span className="board-attach-down"> <DownloadIcon /> </span>
                                                </span>
                                            )
                                        })
                                        : null
                                    }
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="board-view-middle" style={{paddingBottom: "20px"}}> <Viewer content={detail?.content}/> </div>
                        </div>
                        : null
                    }
                {/* </div> */}
            </div>
        </div>
    )
}

export default BoardPopup
import { useContext, useState, useEffect, useLayoutEffect } from "react"
import moment from "moment/moment";

import Viewer from "../components/Viewer"

import { generateRandomString, downloadAttachment } from "../utils/CommonFunction"

import '../scss/style.scss';
import { ReactComponent as AttachmentIcon } from '../assets/svgs/icon_attachment.svg';
import { ReactComponent as DownloadIcon } from '../assets/svgs/icon_download.svg';
import { ReactComponent as ScreenIcon } from '../assets/svgs/icon_screen.svg';
import { ReactComponent as CloseIcon } from '../assets/svgs/icon_close2.svg';

const BoardPopup = ({ detail, attachments, onClose, onMinimizing }) => {

    return (
        <div className="board-popup">
            <div className="window">
                <div className="popup">
                    {
                        detail ?
                        <div className="board-view">
                        <div className="board-view-top">
                            <div className="board-btn-area custom-flex-item custom-align-item custom-justify-between">
                                <button className="board-full-btn" onClick={onMinimizing}>
                                    <ScreenIcon /> Exit Full Screen
                                </button>
                                <CloseIcon onClick={onClose} />
                            </div>
                            <p className="board-title">{detail?.title}</p>
                            <p className="board-title-detail">
                                <span>Writer</span> : {detail?.writerName} &nbsp;
                                <span>Date</span> : {moment(detail?.createdAt).format('YY.M.DD')} &nbsp;
                                <span>Type</span> : {detail?.view}
                            </p>
                            <div className="board-title-attach">
                                <AttachmentIcon /> 
                                <span className="board-attach">Attachment</span>
                                <span className="custom-flex-item custom-align-item">
                                    <span className="board-attach-count">{!attachments ? '' : ` (${attachments.length})`}</span>
                                    <p className="custom-hyphen custom-self-align">{!attachments ? '' : '-'}</p>
                                    {
                                        attachments ?
                                        attachments.map((file, idx) => {
                                            return (
                                                <span className="board-attach-box" key={generateRandomString(idx)}> 
                                                    <p>{file.fileName}</p>
                                                    <span className="board-attach-down" onClick={() => downloadAttachment(file.uploadPath)}> <DownloadIcon /> </span>
                                                </span>
                                            )
                                        })
                                        : null
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="board-view-middle"> <Viewer content={detail?.content}/> </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default BoardPopup
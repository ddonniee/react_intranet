import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import '../scss/style.scss';
import { ReactComponent as CalendarIcon } from '../assets/svgs/icon_calendar.svg';
import { forwardRef } from 'react';

/**
 * 
 * @param {
 * startDate : 시작일
 * endDate : 종료일
 * startName : 시작일 form name
 * endName : 종료일 form name
 * setStartDate : 시작일 반환
 * setEndDate : 종료일 반환
 * isDuration : true 기간(시작-종료) 선택, false 날짜 선택
 * readOnly : 선택 가능여부
 * } props 
 * @returns 
 */
function CustomDatePicker (props) {

    const [firstDate, setFirstDate] = useState(props.startDate ? new Date(props.startDate) : new Date());
    const [secondDate, setSecondDate] = useState(props.endDate ? new Date(props.endDate) : new Date());
    const [isDuration, setIsDuration] = useState(false); // true 시작/종료일 선택, false는 하루만 선택

    const dateFormat_ = (date) => {
        let dateFormat__ = date.getFullYear() +
            '-' + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
            '-' + ((date.getDate()) <= 9 ? "0" + (date.getDate()) : (date.getDate()));
        return dateFormat__;
    }
    // 오늘날짜 기본 데이터로
    // props.getSearchDate(dateFormat_(firstDate));
    // props.getEndDate && props.getEndDate(dateFormat_(secondDate));

    useEffect(() => {
        if (isDuration && (firstDate > secondDate)) {
            alert('시작일과 종료일을 확인해주세요.')
            setFirstDate(new Date());
            setSecondDate(new Date());
        }
        props.setStartDate && props.setStartDate(firstDate);
    }, [firstDate])

    useEffect(() => {
        if (isDuration && (firstDate > secondDate)) {
            alert('시작일과 종료일을 확인해주세요.')
            setSecondDate(new Date());
        }
        props.setEndDate && props.setEndDate(secondDate);
    }, [secondDate])

    useEffect(() => {
        if (props.isDuration) {
            setIsDuration(props.isDuration)
        }
    }, [])

    const CustomPicker = forwardRef(({ value, onClick }, ref) => (
        <div className="custom-cal" onClick={onClick} ref={ref}>
          <span className='custom-picker'> {value} <CalendarIcon /> </span>
        </div>
    ));

    return (
        <div className='custom-flex-item custom-align-item'>
            <DatePicker
                name={props.startName || 'startDate'}
                locale={ko} 
                dateFormat="yyyy-MM-dd"
                selected={firstDate}
                onChange={(date) => { setFirstDate(date); }}
                // popperPlacement="top-start" 
                shouldCloseOnSelect={true}
                className='custom-picker'
                readOnly = {props.readOnly ? true : false}
                customInput={<CustomPicker />}
            />
            {
                isDuration
                ?
                <>
                    <div style={{ padding: '0 13px' }}>~</div>
                    <DatePicker
                        name={props.endName || 'endDate'}
                        locale={ko} 
                        dateFormat="yyyy-MM-dd"
                        selected={secondDate}
                        onChange={(date) => { setSecondDate(date); }}
                        // popperPlacement="top-start" 
                        shouldCloseOnSelect={true}
                        className='custom-picker'
                        readOnly = {props.readOnly ? true : false}
                        customInput={<CustomPicker />}
                    />
                </>
                :
                null
            }
        </div>
    )
}

export default CustomDatePicker;
import moment from 'moment';
import {CSVLink, CSVDownload} from 'react-csv';

/**
 *  작성자 : 이은정
 *  작성일 : 2023.05.22
 *  기능 : 배열전달시 엑셀로 추출
 * @param {
 * csvData : 엑셀로 추출할 객체로 구성된 배열
 * filename : 엑셀로 저장할 파일명
 * } props 
 * @returns 엑셀다운로드 
 */
function ExportExcel (props) {

    
    const {csvData, filename } = props;
    // if(csvData.length!==0 || filename===undefined) {
    //     alert('filepath or filename not submitted')
    //     return false;
    // }
    return(
        <>
        {csvData.length!==0 
        ?
        <CSVLink data={csvData} filename={filename+moment().format('yyyy-MM-DD_HH-mm-ss')+'.csv'} >
                <button type='button' className='btn-download'>엑셀다운</button>
        </CSVLink>
        :
        <div>다운로드받을 데이터가 존재하지 않습니다</div>
        }</>
    )

}

export default ExportExcel
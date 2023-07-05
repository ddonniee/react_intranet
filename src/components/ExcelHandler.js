import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import { utils, writeFile, write } from 'xlsx';

export const ExcelUploader = ({ onChange, excelData, setExcelData }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    readXlsxFile(file)
      .then((rows) => {
        setData(rows);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <div>Error: {error}</div>}
      {data && (
        <div style={{height: "300px", overflow: "auto"}}>
        <table style={{border: "1px solid black", borderCollapse: "collapse"}}>
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index} style={{border: "1px solid black"}}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{border: "1px solid black"}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

// 현재 날짜 생성 (연월일시)
const date = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2); 
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2); 

  return year + month + day + hours + minutes + seconds;
}

export const ExcelDownloader = ({data, viewname}) => {

  const downloadExcelFile = () => {
    // 엑셀 파일 생성
    const worksheet = utils.aoa_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    
    // 파일 저장
    let dateString = date();

    const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `csportal_${viewname}_${dateString}.xlsx`;

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // IE에서 파일 다운로드
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // 다른 브라우저에서 파일 다운로드
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }

  return (
    <button type='submit' onClick={downloadExcelFile}>Excel</button>
  )

}

// export default ExcelUploader;
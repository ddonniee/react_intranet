import { useState } from "react"

import ExportExcel from "../utils/ExportExcel"


function Faq() {

    // const [csvData, setCsvData] = useState([]);
    const [csvData, setCsvData] = useState([{ name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'San Francisco' },
    { name: 'Bob', age: 35, city: 'Los Angeles' },])
    const [filename, setFilename] = useState('test');

    return (
        <>
        {csvData &&<ExportExcel csvData={csvData} filename={filename}/>}
        </>
    )
}
export default Faq

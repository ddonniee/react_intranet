// import { useState } from "react"

// import ExportExcel from "../../utils/ExportExcel"


import { useContext, useState } from "react"
import { TestContext } from "../../hooks/TestContext"


import Header from "../../components/Header"
import Top from "../../components/Top"
function Faq() {

    // const testValue = useContext(TestContext)
    return (
        <>
        <Header />
        <div className="inner-container">
            <Top />
            <div className="faq-nav"></div>
            <div className="faq-contents"></div>
        </div>
        </>
    )
}

// function Faq() {

//     // const [csvData, setCsvData] = useState([]);
//     const [csvData, setCsvData] = useState([{ name: 'John', age: 30, city: 'New York' },
//     { name: 'Jane', age: 25, city: 'San Francisco' },
//     { name: 'Bob', age: 35, city: 'Los Angeles' },])
//     const [filename, setFilename] = useState('test');

//     return (
//         <>
//         {csvData &&<ExportExcel csvData={csvData} filename={filename}/>}
//         </>
//     )
// }
export default Faq

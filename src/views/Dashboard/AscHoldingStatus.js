import { useContext, useState } from "react"
import { TestContext } from "../../hooks/TestContext"

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"

function AscHoldingStatus() {

    // const testValue = useContext(TestContext)
    return (
        <>
       <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            <Zendesk />
        </div>
        </>
    )
}

export default AscHoldingStatus
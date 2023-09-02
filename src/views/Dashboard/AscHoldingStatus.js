import { useContext, useState } from "react"
import { TestContext } from "../../hooks/UserContext"

import Header from "../../components/Header"
import Top from "../../components/Top"

function AscHoldingStatus() {

    // const testValue = useContext(TestContext)
    return (
        <>
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
        </div>
        </>
    )
}

export default AscHoldingStatus
import { useContext, useState } from "react"
import Editor from "../components/Editor"
import FileUpload from "../hooks/FileUpload"
import { TestContext } from "../hooks/TestContext"
import Favorite from "../components/Favorite"

function Main() {

    const testValue = useContext(TestContext)
    return (
        <>
        <div>{testValue.email}</div>
       
        <Favorite />
        <FileUpload />
        </>
    )
}

export default Main
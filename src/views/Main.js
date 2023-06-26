import { useContext, useState } from "react"
import Editor from "../components/Editor"
import FileUpload from "../hooks/FileUpload"
import { UserContext } from "../hooks/UserContext"
import Favorite from "../components/Favorite"

function Main() {

    const testValue = useContext(UserContext)
    return (
        <>
        <div>{testValue.email}</div>
       
        <Favorite />
        <FileUpload />
        </>
    )
}

export default Main
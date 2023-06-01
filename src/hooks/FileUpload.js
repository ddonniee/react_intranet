import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUpload() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <button>파일업로드</button>
      }
    </div>
  )
}
export default FileUpload;
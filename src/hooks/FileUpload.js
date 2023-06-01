import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUpload() {
  const onDrop = useCallback((acceptedFiles,rejectedFiles) => {
    console.log(acceptedFiles)
    console.log(rejectedFiles)
  }, [])

  const onDropRejected = useCallback(() => {
    alert('파일 크기가 제한을 초과했습니다.');
  }, []);
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    onDropRejected,
    maxSize : 100 * 1024 * 1024
  })

 
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
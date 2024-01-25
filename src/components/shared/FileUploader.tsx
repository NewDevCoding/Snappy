import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';;

const FileUploader = () => {

    const [fileUrl, setfileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-excel cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
      fileUrl? (
        <div>
            test 1
        </div>
      ) : (
        <div>
            test 2
        </div>
      )
    }
    </div>
  )
}

export default FileUploader
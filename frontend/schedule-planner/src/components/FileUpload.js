import * as React from 'react';
import { useState } from 'react';
import Dropzone from "react-dropzone";

function FileUpload() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    function handleUpload(acceptedFiles) {  //handles logging the uploaded file
        console.log("logging drop/selected file",acceptedFiles);
        // fake request to upload file
        const url = "https://api.escuelajs.co/api/v1/files/upload";
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]); // Assuming you only accept one file
        setFileName(acceptedFiles[0].name);

        fetch(url, {
        method: "POST",
        body: formData,
        })
        .then((response) => {
            if (response.ok) {
            // File uploaded successfully
            setFile(acceptedFiles[0]);
            } else {
            // File upload failed
            console.error(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className='flex text-5xl font-semibold'>
                <p>Upload transcript here</p>
            </div>
            <div className='h-40 w-3/4 flex flex-wrap justify-center items-center bg-blue-100 rounded-3xl border-2 border-blue-800 border-dashed mt-10'>
                <Dropzone onDrop={handleUpload} accept="application/pdf" minSize={1024} maxSize={3072000}>
                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                    return (
                        <div
                        {...getRootProps({
                            className: 'h-full w-full cursor-pointer flex justify-center items-center',
                        })}
                        >
                        <input {...getInputProps()} />
                        <p>Drag & Drop transcript, or click to Browse</p>
                        </div>
                    );
                    }}
                </Dropzone>
            </div>
            {file && (
                <div className="flex flex-row w-3/4 justify-center items-center mt-2">
                <h4>File Uploaded Successfully:</h4>
                <p className='ml-4'>{fileName}</p>
                {/* <img src={URL.createObjectURL(file)} className="w-30 h-8" alt="Uploaded file" /> */}
                </div>
            )}
        </div>
        
    )
}

export default FileUpload;
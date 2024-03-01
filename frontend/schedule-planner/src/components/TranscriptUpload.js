import React from 'react';
import {useDropzone} from 'react-dropzone';

function TranscriptUpload(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'application/pdf': []
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      File uploaded successfully: {file.path}
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      Only upload pdf files. {file.path} is not a pdf file
    </li>
  ));

  return (
    <section className="h-screen flex flex-col justify-center items-center">
        <div className='flex text-5xl font-semibold'>
                <p>Upload transcript here</p>
            </div>
                <div {...getRootProps({ className: 'h-40 w-3/4 flex flex-wrap flex-col justify-center items-center bg-blue-100 rounded-3xl border-2 border-blue-800 border-dashed mt-10' })}>
                    <input {...getInputProps()} />
                    <p>Drag & Drop transcript, or click to Browse</p>
                    <em>(Only pdf files will be accepted)</em>
            </div>
            <aside>
                <h4 className='mt-4 flex justify-center font-semibold text-xl mb-4'>Uploaded file</h4>
                <ul>{acceptedFileItems}</ul>
                <ul>{fileRejectionItems}</ul>
            </aside>
            <button className='mt-8 w-1/2 lg:w-32 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-800 text-white text-lg font-bold'>Submit</button>
    </section>
  );
}

export default TranscriptUpload;
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"

export const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null
}) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // console.log("Printing file", file);

    if(file){
      previewFile(file);
      setSelectedFile(file);
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept : !video ? {"image/*" : [".jpeg", ".jpg", ".png"]} : {"video/*" : [".mp4"]},
    onDrop
  })

  useEffect(() => {
      register(name, {
      required : true
    })
  }, [register])
 
  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])


  return (<div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor={name}>
      {label}{!viewData && (<sup className="text-pink-200">*</sup>)}</label>
      <div
      className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {
          previewSource ? (<div className="flex w-full flex-col p-6">
            {
              !video ? (
                <img
                  src={previewSource}
                  alt='preview'
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <Player src={previewSource} aspectRatio="16:9" playsInline/>
              )
            }
            {
              !viewData && (<button
                type='button'
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>)
            }
          </div>) : (<div
            {...getRootProps()} 
            className="flex w-full flex-col items-center p-6"
            >
            <input
              id={name}
              name={name}
              {...getInputProps()}
            />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50"/>
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and Drop an {!video ? "Image" : "Video"}, or Click to {" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>)
        }
      </div>
      {
        errors[name] && (<span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is Required.
        </span>)
      }
  </div>)
}

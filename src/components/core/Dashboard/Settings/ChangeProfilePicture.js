import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CTAButton } from '../../HomePage/CTAButton';
import { FiUpload } from 'react-icons/fi';
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';

export const ChangeProfilePicture = () => {

  const token = useSelector((state) => (state.auth.token));
  // console.log("token", token);
  const user = useSelector((state) => state.profile.user);
  // console.log("User is", user);

  const fileInputRef = useRef(null);
  // console.log("fileInputRef", fileInputRef);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const handleClick = () => {
    // console.log("Inside handleClick function ");
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("handleFileChange function ", file);
    if(file){
      setImageFile(file);
      previewFile(file);
    }
  }

  // Function to convert file(image) into url.
  const previewFile = (file) => {
    const reader = new FileReader();
    // console.log("Inside previewFile function", reader);
    reader.readAsDataURL(file);
  
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  } 

  const handleFileUpload = async() => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("imageFile", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      })
    }
    catch(err){
      console.log("ERROR MESSAGE - ", err.message);
    }
  }


  return (
    <div className='flex items-center justify-between p-10 bg-richblack-700 w-[792px] h-[126px] rounded-lg'>
        <div className="flex items-center gap-x-10">
          <img src={previewSource || user.image}
            alt=''
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p className='text-richblack-5'>
              Change Profile Picture
            </p>
            <div className="flex flex-row gap-3">
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept="image/png, image/gif, image/jpeg"
              />
              <div onClick={handleClick}>
                <CTAButton active={true} type='submit'>
                  Select
                </CTAButton>
              </div>
              <div onClick={handleFileUpload}>
                <CTAButton>
                  <div className='flex gap-2'>
                    {
                      loading ? "Uploading..." : "Upload"
                    }
                    {
                      !loading && (<FiUpload className="text-lg"/>)
                    }
                  </div>
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

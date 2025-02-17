import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../../HomePage/CTAButton';
import './Calender.css';
import { updateProfile } from '../../../../services/operations/SettingsAPI';


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export const EditProfile = () => {
  
  const user = useSelector((state) => (state.profile.user));
  // console.log("User",user);
  const token = useSelector((state) => (state.auth.token));
  // console.log("token",token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm();

  const submitProfileForm = async(data) => {
    // console.log("Form Data", data);
    try{
      dispatch(updateProfile(token, data, user));
    }
    catch(err){
      console.log("Error Message", err.message);
    }
  }


  return (
    <div className='flex items-center justify-between p-10 bg-richblack-700 w-[792px] rounded-lg'>
      <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit(submitProfileForm)}>
      {/* Profile Information */}
        <div className='flex flex-col w-full text-[#F1F2FF]'>
          <h2 className="font-semibold text-2xl text-richblack-5 mb-4">
            Profile Information
          </h2>

          <div className="flex w-full justify-between lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor='firstName' className="lable-style">
                First Name
              </label>
              <input
                type='text'
                name='fName'
                id='firstName'
                placeholder='Enter Your Name'
                className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none'
                {...register('fName', {required : true})}
                defaultValue={user.fName}
              />
              {
                errors.fName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                  </span>
                )
              }
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lName"
                id="lastName"
                placeholder="Enter Last name"
                className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none'
                {...register("lName", { required: true })}
                defaultValue={user?.lName}
              />
              {errors.lName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full justify-between lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor='dob' className="lable-style">Date of Birth</label>
              <input
                type='date'
                id='dob'
                name='dateOfBirth'
                {...register('dateOfBirth', {
                  required : {
                    value : true,
                    message : 'Please Enter your Date of Birth.'
                  },
                  max : {
                    value : new Date().toISOString().split("T")[0],
                    message : "Date of Birth cannot be in the future.",
                  }
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
                className='date-input placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none'
                />
                {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
                )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor='Gender'>Gender</label>
              <select 
                name='gender' 
                id='Gender'
                className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none'
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                <option value="">Select</option>
                {
                  genders.map((ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })
                }
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please Select Your Gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full justify-between lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='number' className="lable-style">Contact Number</label>
            <input
              type='tel'
              id='number'
              name='contactNumber' 
              placeholder="Enter Contact Number"
              className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}                   
            />
            {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
            )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="aboutMe" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="aboutMe"
                placeholder="Enter Bio Details"
                className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none'
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-8'>
          <div onClick={() => navigate("/dashboard/my-profile")}>
            <CTAButton active={false}>
                Cancel
            </CTAButton>
          </div>
          <CTAButton active={true} type='submit'>
            Save
          </CTAButton>
        </div>
      </form>
    </div>
  )
}

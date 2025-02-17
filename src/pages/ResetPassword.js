import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CTAButton } from '../components/core/HomePage/CTAButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/Thunks';


export const ResetPassword = () => {

  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isCnfPwdVisible, setIsCnfPwdVisible] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password : "",
    confirmPassword : ""
  })

  const location = useLocation();
  // console.log("Current Location is : ", location);
  // console.log(location.pathname.split('/').at(-1));
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name] : event.target.value,
      }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1);

    const entireFormDate = {
      ...formData,
      token,
    }

    // console.log("Entire formData is :", entireFormDate);
    dispatch(resetPassword(entireFormDate, navigate));
  }

  return (<div className='min-h-screen bg-richblack-900 flex justify-center items-center'>
    <div className='w-[508px] p-4 flex flex-col gap-5'>
      <div className='w-[444px]'>
        <p className='text-richblack-5 text-3xl'>Choose new password</p>
        <div className='text-richblack-100 text-lg'>Almost done. Enter your new password and youre all set.</div>
      </div>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <label className='relative'>
          <p className='text-richblack-5 text-sm mb-2'>
            New password
            <sup className='text-pink-200'>*</sup>
          </p>
          <input
            required
            type={isPwdVisible ? "text" : "password"}
            className='placeholder:text-richblack-200 bg-richblack-800 w-[444px] h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none'
            placeholder='Enter Password'
            value={formData.password}
            name='password'
            onChange={changeHandler}
          />
          <span onClick={() => setIsPwdVisible(!isPwdVisible)} className='absolute right-12 top-11 text-[#374957] w-[18px]'>
            {
              isPwdVisible ? <FaEyeSlash/> : <FaEye/>
            }
          </span>
        </label>

        <label className='relative'>
          <p className='text-richblack-5 text-sm mb-2'>
            Confirm new password
            <sup className='text-pink-200'>*</sup>
          </p>
          <input
            className='placeholder:text-richblack-200 bg-richblack-800 w-[444px] h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none'
            required
            type={isCnfPwdVisible ? "text" : "password"}
            placeholder='Enter Confirm Password'
            value={formData.confirmPassword}
            name='confirmPassword'
            onChange={changeHandler}
          />
          <span onClick={() => setIsCnfPwdVisible(!isCnfPwdVisible)} className='absolute right-12 top-11 text-[#374957] w-[18px]'>
          {
            isCnfPwdVisible ? <FaEyeSlash/> : <FaEye/>
          }
        </span>
        </label>

        <div className='w-[444px]'>
          <CTAButton active={true} type='submit'>
            Reset Password
          </CTAButton>
        </div>
      </form>
      <div>
        <Link to="/login" className='flex items-center gap-2 text-richblack-5 text-base'>
          <BiArrowBack/>
          Back to Login
        </Link>
      </div>
    </div>
  </div>)
}

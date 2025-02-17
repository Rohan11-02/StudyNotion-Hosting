import React, { useState } from 'react'
import { CTAButton } from '../components/core/HomePage/CTAButton';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { sendOpt, signup } from '../services/operations/Thunks';

export const VerifyEmail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state)=>(state.auth.signupData));
//   console.log("Printing userData :", userData);
  // console.log(typeof(userData));
  const email = useSelector((state) => (state.auth.signupData.email));
//   console.log("Printing value of email : ", email);

  const [formData, setFormData] = useState({
    otp : "",
  })

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setFormData((prev)=> {
        return {
            ...prev,
            [name] : value,
        }
    })
  }

  const clickHandler = () => {
    dispatch(sendOpt(email, navigate));
  }

  const handleOnSubmit = () => {
    const updateUserData = {
        ...userData,
        otp : formData.otp
    }
    // console.log("Updated data is :", updateUserData);
    dispatch(signup(updateUserData, navigate));
  }

  return (<div className='flex justify-center items-center min-h-screen bg-richblack-900'>
    <div className='w-[508px] h-[370px] flex flex-col items-center py-5 gap-4'>
        <div>
            <div className='w-[444px] text-richblack-5 text-3xl'>Verify Email</div>
            <div className='w-[444px] text-richblack-100 text-lg'>
                A verification code has been sent to you. Enter the code below
            </div>
        </div>
        <input
            className='w-[444px] bg-richblack-800 h-12 rounded-lg px-2 outline-none text-richblack-5'
            required
            maxLength="6"
            type='text'
            value={formData.otp}
            name='otp'
            placeholder='Enter Your One-Time OTP'
            onChange={changeHandler}
        />
        <div className='w-[444px] mt-2 text-center' onClick={handleOnSubmit}>
            <CTAButton active={true}>
                Verify and Register
            </CTAButton>
        </div>
        <div className='flex w-[444px] justify-between'>
            <Link to="/login" className='flex items-center gap-2 text-richblack-5 text-base'>
                <BiArrowBack />
                Back to login
            </Link>
            <div className='flex items-center gap-2 text-blue-100 text-base cursor-pointer'
            onClick={clickHandler}>
                <FaClockRotateLeft />
                Resend it
            </div>
        </div>
    </div>
  </div>)
}

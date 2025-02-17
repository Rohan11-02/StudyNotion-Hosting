import React, { useState } from 'react'
import { CTAButton } from '../components/core/HomePage/CTAButton';
import { BiArrowBack } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { forgotPasswordToken } from '../services/operations/Thunks';
import { useDispatch } from 'react-redux';

export const ForgotPasswordToken = () => {

  const [email, setEmail] = useState("");  
  const [emailSent, isEmailSent] = useState(false);

  const changeHandler = (event) => {
    setEmail([event.target.name] = event.target.value)
  }
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(forgotPasswordToken(email, isEmailSent));
  }

  return (<div className='min-h-screen bg-richblack-900 flex justify-center items-center'>
    <div>
        {
            emailSent ? (<div className='w-[508px] h-[310px] flex flex-col p-6 gap-7'>
                <div>
                    <p className='text-richblack-5 text-3xl'>Check email</p>
                    <div className='text-richblack-100 '>
                        We have sent the reset email to {email}
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <button className='w-[444px]' onClick={submitHandler}>
                        <CTAButton active={true} type='submit'>
                            Resend email
                        </CTAButton>
                    </button>
                    <Link to="/login" className='flex items-center gap-2 text-richblack-5 text-base'>
                        <BiArrowBack />
                        Back to login
                    </Link>
                </div>
                
                
            </div>) : (<div className='w-[508px] h-[448px] p-6 flex flex-col justify-around'>
                <div className='w-[444px]'>
                    <p className='text-richblack-5 text-3xl mb-4'>Reset your password</p>
                    <div className='text-richblack-100 text-lg'>
                    Have no fear. We'll email you instructions to reset your password. 
                    If you dont have access to your email we can try account recovery
                    </div>
                </div>
                <form className='flex gap-4 flex-col' onSubmit={submitHandler}>
                    <label>
                        <p className='text-richblack-5 text-sm mb-3'>
                            Email Address
                            <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type='email'
                            className='placeholder:text-richblack-200 bg-richblack-800 w-[444px] h-[48px] 
                            rounded-lg p-3 text-richblack-5 outline-none'
                            name='email'
                            value={email}
                            onChange={changeHandler}
                            placeholder='Enter Your Email'
                        />
                    </label>

                    <button className='w-[444px]'>
                        <CTAButton active={true} type='submit'>
                            Reset Password
                        </CTAButton>
                    </button>
                </form>
                <div>
                    <Link to="/login" className='flex items-center gap-2 text-richblack-5 text-base'>
                        <BiArrowBack />
                        Back to login
                    </Link>
                </div>
            </div>)
        }
    </div>
  </div>)
}

import React, { useState } from 'react'
import { Header } from '../components/core/SignLog/Header'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CTAButton } from '../components/core/HomePage/CTAButton';
import { Link, useNavigate } from 'react-router-dom';
import loginStudent from "../assets/Images/login.webp"
import signupInstructor from '../assets/Images/signlogInstructor.jpeg';
import frame from "../assets/Images/frame.png";
import { useDispatch } from 'react-redux';
import { login } from '../services/operations/Thunks';

// Add link to forgot password 
// set backend api

const Student = {
  heading : "Welcome Back",
  subHeading : "Build skills for today, tomorrow, and beyond.",
  subHeadingPortion : "Education to future-proof your career."
}

const Instructors = {
  heading : "Welcome Back",
  subHeading : "Discover your passions,",
  subHeadingPortion : "Be Unstoppable"
}
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState("Student");
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    email : "",
    password : "",
  })


  const submitHandler = (event) => {
    event.preventDefault();
    const entireData = {
      ...formData,
      accountType
    }
    // console.log("Entire FormData :", entireData);
    dispatch(login(formData, navigate));
  }


  const changeHandler = (event) => {
    const {name, type, checked, value} = event.target;
    setFormData((prev)=>{
      return {
        ...prev,
        [name] : type === "checkbox" ? checked : value,
      }
    })
  }
  return (<div className='bg-richblack-900 min-h-screen flex justify-center items-center gap-14'>
    <div className='w-[508px] h-[804px] flex flex-col gap-9 justify-center'>
      <div className='w-[444px]'>
        {
          accountType === "Student" ? <Header data={Student}/> : <Header data={Instructors}/>
        }
      </div>

      <div className='w-[230px] h-[44px] bg-richblack-800 px-1 py-6 rounded-full flex justify-center items-center'>
          <button className={`${accountType === "Student" 
          ? "bg-richblack-900 text-richblack-5 text-base px-4 py-2 rounded-full" 
          : "text-richblack-200 px-4 py-2"} w-[50%]`} onClick={()=>(setAccountType("Student"))}>
            Student
          </button>
          <button className={`${accountType === "Instructor" 
          ? "bg-richblack-900 text-richblack-5 text-base px-4 py-2 rounded-full"
          : "text-richblack-200"} w-[50%]`} onClick={()=>(setAccountType("Instructor"))}>
            Instructors
          </button>
        </div>

      <form onSubmit={submitHandler} className='flex flex-col gap-5 relative'>
          <label>
            <p className='text-richblack-5'>
              Email Address
              <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type='email'
              className='placeholder:text-richblack-200 bg-richblack-800 w-[444px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              placeholder='Enter email address'
              value={formData.email}
              name='email'
              id='mail'
              onChange={changeHandler}
            />
          </label>

          <label className='relative'>
            <p className='text-richblack-5'>
              Password
              <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type={`${isVisible ? "text" : "password"}`}
              placeholder='Enter Password'
              name='password'
              id='pwd'
              className='placeholder:text-richblack-200 bg-richblack-800 w-[444px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              value={formData.password}
              onChange={changeHandler}
            />
            <span onClick={()=>(setIsVisible(!isVisible))} className='absolute right-20 top-10 text-[#374957] w-[18px]'>
              {
                isVisible ? <FaEyeSlash/> : <FaEye/>
              }
            </span>
          </label>
          
          <Link to="/forgot-password" className='w-[444px] flex justify-end absolute top-[166px]'>
            <div className='text-blue-100 text-xs'>Forgot password</div>
          </Link>

          <div className='w-[444px] mt-7'>
            <CTAButton active={true} type='submit'>
              Login
            </CTAButton>
          </div>
      </form>
    </div>
    <div className='text-black relative'>
      <img src={`${accountType === "Student" ? loginStudent : signupInstructor}`}
        className='w-[558px] h-[504px] object-cover z-10 relative'
        alt=''
      />
      <img src={frame} className='absolute top-4 left-4' alt=''/>
    </div>
  </div>)
}

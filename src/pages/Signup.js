import React, { useState } from 'react';
import signupStudent from '../assets/Images/signup.webp';
import signupInstructor from '../assets/Images/signlogInstructor.jpeg';
import frame from "../assets/Images/frame.png";
import { CTAButton } from '../components/core/HomePage/CTAButton';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import countryCodes from "../data/countrycode.json"
import { Header } from '../components/core/SignLog/Header';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../redux/slices/authSlice';
import { sendOpt } from '../services/operations/Thunks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


// set backend api

const Student = {
    heading : "Join the millions learning to code with StudyNotion for free",
    subHeading : "Build skills for today, tomorrow, and beyond.",
    subHeadingPortion : "Education to future-proof your career."
}

const Instructors = {
  heading : "Welcome Back",
  subHeading : "Discover your passions,",
  subHeadingPortion : "Be Unstoppable",
}

export const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isCnfVisible, setIsCnfVisible] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const [formData, setFormData] = useState({
    fName : "",
    lName : "",
    email : "",
    countryCode : "",
    phone : "",
    password : "",
    confirmPassword : ""
  }) 

  // console.log("formData",formData);

  const changeHandler = (event) => {
    const {name, type, value, checked} = event.target;
    setFormData((prev)=>{
      return {
        ...prev,
        [name] : type === "checkbox" ? checked : value,
      }
    })
  }

  const SubmitHandler = (event) => {
    event.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error("Password do not match");
    }
    
    const entireData = {
      ...formData,
      accountType
    }
    // console.log("Entire Data : ",entireData);
    dispatch(setSignupData(entireData));

    dispatch(sendOpt(formData.email, navigate));
  }

  return (<div className='bg-richblack-900 min-h-screen flex justify-center items-center gap-14'>
    <div className='w-[508px] h-[804px] flex flex-col gap-9 justify-center'>
      <div className='w-[444px]'>
        {
          accountType === "Student" ? <Header data={Student}/>: <Header data={Instructors}/>
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

      <form className='flex flex-col gap-5' onSubmit={SubmitHandler}>
        <div className='flex gap-5'>
          <label>
            <p className='text-richblack-5'>
              First Name
              <sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type='text'
              className='placeholder:text-richblack-200 bg-richblack-800 w-[212px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              value={formData.fName}
              placeholder='Enter first name'
              name='fName'
              id='firstName'
              onChange={changeHandler}
            />
          </label>
          <label>
            <p className='text-richblack-5'>
              Last Name
              <sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type='text'
              className='placeholder:text-richblack-200 bg-richblack-800 w-[212px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              value={formData.lName}
              placeholder='Enter last name'
              name='lName'
              id='lastName'
              onChange={changeHandler}
            />
          </label>
        </div>

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
            value={formData.email}
            placeholder='Enter email address'
            name='email'
            id='mail'
            onChange={changeHandler}
          />
        </label>

        <label htmlFor='number' className='text-richblack-5'>
          Phone Number
          <sup className='text-pink-200'>*</sup>
        </label>
        <div className='flex gap-5'>
          <select required name='countryCode' value={formData.countryCode} className='placeholder:text-richblack-200 bg-richblack-800 w-[81px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none' onChange={changeHandler}>
            <option value="">Select</option>  
            {
              countryCodes.map((countryCode, index) => {
                return (<option key={index} value={countryCode.code}>{countryCode.code} {countryCode.country}</option>)
              })
            }
          </select>
          <input 
            required
            type='tel'
            className='placeholder:text-richblack-200 bg-richblack-800 w-[343px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
            id='number'
            value={formData.phone}
            placeholder='12345 67890'
            name='phone'
            onChange={changeHandler}
          />
        </div>

        <div className='flex gap-5'>
          <label className='relative'>
            <p className='text-richblack-5'>
              Create Password
              <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type={`${isVisible ? "text" : "password" }`}
              className='placeholder:text-richblack-200 bg-richblack-800 w-[212px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              placeholder='Enter Password'
              value={formData.password}
              name='password'
              id='pwd'
              onChange={changeHandler}
            />
            <span onClick={() => (setIsVisible(!isVisible))} className='absolute right-2 top-[41px] text-[#374957] w-[18px]'>
              {
                isVisible ? <FaEyeSlash/> : <FaEye/>
              }
            </span>
          </label>
          <label className='relative'>
            <p className='text-richblack-5'>
              Confirm Password
              <sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              className='placeholder:text-richblack-200 bg-richblack-800 w-[212px] h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
              placeholder='Enter Password'
              type={`${isCnfVisible ? "text" : "password"}`}
              name='confirmPassword'
              id='cnfPwd'
              value={formData.confirmPassword}
              onChange={changeHandler}
            />
            <span onClick={() => (setIsCnfVisible(!isCnfVisible))} className='absolute right-2 top-[41px] text-[#374957] w-[18px]'>
              {
                isCnfVisible ? <FaEyeSlash/> : <FaEye/>
              }
            </span>
          </label>
        </div>

        <div className='w-[444px]'>
          <CTAButton active={true} type='submit'>
            Create Account
          </CTAButton>
        </div>
      </form>
    </div>

    <div className='text-black relative'>
      <img src={`${accountType === "Student" ? signupStudent : signupInstructor}`} alt='' 
      className='w-[558px] h-[504px] object-cover z-10 relative'/>
      <img src={frame} className='absolute top-4 left-4' alt=''/>
    </div>
  </div>)
}

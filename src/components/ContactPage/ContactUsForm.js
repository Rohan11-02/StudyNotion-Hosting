import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import countryCodes from '../../data/countrycode.json'
import { CTAButton } from '../core/HomePage/CTAButton';
import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiConnector';
import { contactUsEndpoint } from '../../services/apis';

export const ContactUsForm = () => {

  const {
    register,
    reset,
    handleSubmit,
    formState : {errors, isSubmitSuccessful}
  } = useForm();

  const submitHandler = async(data) => {
    // console.log("Logging Data",data);
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiConnector("POST", contactUsEndpoint.CONTACT_US_API,
        data,
      );
      // console.log("Logging Response :", response);
    }
    catch(err){
      console.log(err);
      toast.error("Failed to sent contact form");
    }
    toast.dismiss(toastId);
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        firstName : "",
        lastName : "",
        email : "",
        countryCode : "",
        phone : "",
        message : "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (<form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-6 mt-20'>
    {/* firstName && lastName */}
    <div className='flex justify-between'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='fName' className='text-richblack-5 text-sm'>First Name</label>
        <input
          type='text'
          id='fName'
          name='firstName'
          {...register('firstName', {required : true})}
          placeholder='Enter first name'
          className='placeholder:text-richblack-200 bg-richblack-800 w-[258px] h-[48px] 
          rounded-lg p-3 text-richblack-5 outline-none'
        />
        {
          errors.firstName && <p>First name is required.</p>
        }
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='lName' className='text-richblack-5 text-sm'>Last Name</label>
        <input
          type='text'
          className='placeholder:text-richblack-200 bg-richblack-800 w-[258px] h-[48px] 
          rounded-lg p-3 text-richblack-5 outline-none'
          placeholder='Enter last name'
          id='lName'
          name='lastName'
          {...register('lastName', {required : true})}
        />
        {
          errors.lastName && <p>Last Name is required.</p>
        }
      </div>
    </div>

    {/* email */}
    <div className='flex flex-col gap-2'>
      <label htmlFor='mail' className='text-richblack-5 text-sm'>Email Address</label>
      <input
        type='email'
        id='mail'
        name='email'
        placeholder='Enter email address'
        {...register('email', {required : true})}
        className='placeholder:text-richblack-200 bg-richblack-800 w-[536px] h-[48px] 
        rounded-lg p-3 text-richblack-5 outline-none'
      />
    </div>

    {/* phone Number */}
    <div className='flex flex-col gap-2'>
      <label htmlFor='phoneNumber' className='text-richblack-5 text-sm'>Phone Number</label>
      <div className='flex justify-between'>
        <select name='countryCode' className='placeholder:text-richblack-200 bg-richblack-800 w-[80px] h-[48px] 
          rounded-lg p-3 text-richblack-5 outline-none' {...register('countryCode', {required : true})}>
          <option value={""}>Select</option>
          {
            countryCodes.map((countryCode, index) => {
              return (<option key={index} value={countryCode.code}>{countryCode.code} - {countryCode.country}</option>)
            })
          }
        </select>
        <input
          type='tel'
          id='phoneNumber'
          name='phone'
          placeholder='12345 67890'
          {...register('phone', {required : true})}
          className='placeholder:text-richblack-200 bg-richblack-800 w-[435px] h-[48px] 
          rounded-lg p-3 text-richblack-5 outline-none'
        />
      </div>
    </div>

    {/* message */}
    <div className='flex flex-col gap-2'>
      <label htmlFor='chat' className='text-richblack-5 text-sm'>Message</label>
      <textarea
        id='chat'
        name='message'
        placeholder='Enter your message'
        {...register('message', {required : true})}
        className='placeholder:text-richblack-200 bg-richblack-800 w-[536px] h-[124px] 
        rounded-lg p-3 text-richblack-5 outline-none'
      />
    </div>
    <div>
      <CTAButton active={true} type='submit'>
        Send Message
      </CTAButton>
    </div>
  </form>)
}

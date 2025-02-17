import React from 'react'
import { useSelector } from 'react-redux'
import { CTAButton } from '../HomePage/CTAButton';
import { FiEdit } from "react-icons/fi";

export const MyProfile = () => {

  const user = useSelector((state) => (state.profile.user));
  // console.log("Hello there.")
  // console.log(user);

  return (<div className='bg-richblack-900 w-screen min-h-screen pl-48 pt-10 flex flex-col gap-8'>
    <div className='text-3xl text-richblack-5'>My Profile</div>

    {/* Section 1 */}
    <div className='flex items-center justify-between p-10 bg-richblack-700 w-[792px] h-[126px] rounded-lg'>
      <div className='flex items-center gap-6'>
        <img src={user.image} alt='' className='w-[78px] h-[78px] rounded-full object-cover'/>
        <div>
          <p className='text-richblack-5 text-lg'>
            {user.fName} {" "} {user.lName}
          </p>
          <p className='text-richblack-300 text-sm'>
            {user.email}
          </p>
        </div>
      </div>
      <CTAButton active={true} linkto={"/dashboard/settings"}>
        <div className='flex items-center gap-2'>
          Edit
          <FiEdit />
        </div>
      </CTAButton>
    </div>

    {/* Section 2 */}
    <div className='flex flex-col items-center justify-between p-10 bg-richblack-700 w-[792px] h-[126px] rounded-lg'>
      <div className='flex w-full justify-between'>
        <p className='text-richblack-5'>About</p>
        <CTAButton active={true} linkto={"/dashboard/settings"}>
          <div className='flex items-center gap-2'>
            Edit
            <FiEdit/>
          </div>
        </CTAButton>
      </div>
      <div className='text-richblack-300 w-full'>
        {
          user.additionalDetails.about ?? "Write Something About Yourself"
        }
      </div>
    </div>
        
    {/* Section 3 */}
    <div className='flex flex-col items-center justify-between p-10 bg-richblack-700 w-[792px] h-[280px] rounded-lg'>
      <div className='flex justify-between w-full'>
        <p className='text-lg text-richblack-5'>Personal Details</p>
        <CTAButton active={true} linkto={"/dashboard/settings"}>
        <div className='flex items-center gap-2'>
          Edit
          <FiEdit />
        </div>
        </CTAButton>
      </div>

      <div className='w-full flex flex-col gap-2'>
        <div className='flex'>
          <div className='w-[50%]'>
            <p className='text-richblack-300'>First Name</p>
            <p className='text-richblack-5'>{user.fName}</p>
          </div>
          <div>
            <p className='text-richblack-300'>Last Name</p>
            <p className='text-richblack-5'>{user.lName}</p>
          </div>
        </div>

        <div className='flex'>
          <div className='w-[50%]'>
            <p className='text-richblack-300'>Email</p>
            <p className='text-richblack-5'>{user.email}</p>
          </div>
          <div>
            <p className='text-richblack-300'>Phone Number</p>
            <p className='text-richblack-5'>{user.additionalDetails.contactNumber}</p>
          </div>
        </div>

        <div className='flex'>
          <div className='w-[50%]'>
            <p className='text-richblack-300'>Gender</p>
            <p className='text-richblack-5'>{user.additionalDetails.gender ?? "Add Gender"}</p>
          </div>
          <div>
            <p className='text-richblack-300'>Date of Birth</p>
            <p className='text-richblack-5'>{user.additionalDetails.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../../HomePage/CTAButton';
import { changePassword } from '../../../../services/operations/SettingsAPI';


export const UpdatePassword = () => {

  const token = useSelector((state) => (state.auth.token));
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm();

  const dispatch = useDispatch();

  const submitPasswordForm = async(data) => {
    data.confirmNewPassword = data.newPassword;
    // console.log("Password Data", data);
    try{
      dispatch(changePassword(token, data));
    }
    catch(err){
      console.log("ERROR MESSAGE - ", err.message)
    }
  }

  return (<div className='flex items-center justify-between p-10 bg-richblack-700 w-[792px] rounded-lg'>
    <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit(submitPasswordForm)}>
      <div className='flex flex-col w-full text-[#F1F2FF]'>
        <h2 className="text-2xl font-semibold text-richblack-5 mb-4">Password</h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='oldPass' className="lable-style">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name='oldPassword'
              id='oldPass'
              placeholder='Enter Current Password'
              {...register('oldPassword', {required : true})}
              className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
              rounded-lg p-3 text-richblack-5 outline-none'
            />
            <span
            onClick={() => setShowOldPassword((prev) => (!prev))}
            className="absolute right-3 top-[44px] z-[10] cursor-pointer">
              {
                showOldPassword ? 
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : 
                <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
              }
            </span>
            {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="newPass" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPass"
                placeholder="Enter New Password"
                className='placeholder:text-richblack-200 bg-richblack-800 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none'
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[44px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-8'>
        <div onClick={() => navigate('/dashboard/my-profile')}>
          <CTAButton active={false}>
            Cancel
          </CTAButton>
        </div>
        <CTAButton type='submit' active={true}>
          Update
        </CTAButton>
      </div>
    </form>
  </div>)
}


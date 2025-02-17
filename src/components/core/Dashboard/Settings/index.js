import React from 'react'
import { UpdatePassword } from './UpdatePassword'
import { EditProfile } from './EditProfile'
import { ChangeProfilePicture } from './ChangeProfilePicture'
import { DeleteAccount } from './DeleteAccount'

export const Settings = () => {
  return (<div className='bg-richblack-900 w-screen min-h-screen pl-48 pt-10 flex flex-col gap-8'>
    <h2 className="mb-2 text-3xl font-medium text-richblack-5">Edit Profile</h2>
    {/* Change Profile Picture */}
    <ChangeProfilePicture/>
    {/* Profile  */}
    <EditProfile/>
    {/* Password */}
    <UpdatePassword/>
    {/* Delete Account  */}
    <DeleteAccount/>
  </div>)
}

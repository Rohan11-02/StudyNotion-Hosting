import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/Thunks';
import { useOnClickOutside } from '../../../hook/useOnClickOutside';

export const ProfileDropDown = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => (state.profile.user));
  const dispatch = useDispatch();
  const ref = useRef("");

  // console.log("Printing ref :", ref.current);

  useOnClickOutside(ref, () => setOpen(false))

  return (<div>
    <div className='flex items-center gap-1' onClick={() => (setOpen(true))}>
    {
      user && <div>
        <img src={user.image} alt='' className='w-[30px] h-[30px] rounded-full object-cover'/>
      </div>
    }
    <FaChevronDown className='text-sm text-richblack-5'/>
    </div>
    
    <div className='relative'>
    {
      open && <div onClick={(event) => (event.stopPropagation())} ref={ref} className='bg-richblack-700 absolute top-6 -right-16 flex flex-col items-center px-1 py-1 rounded-lg gap-1'>
        <Link to={"/dashboard/my-profile"} className='text-richblack-50 text-lg flex items-center w-32 gap-2 hover:bg-richblack-800 py-1 px-1 rounded-lg transition-all duration-200'>
        <LuLayoutDashboard/>
          Dashboard
        </Link>

        <div className='text-richblack-50 flex items-center w-32 text-lg gap-2 cursor-pointer hover:bg-richblack-800 py-1 px-1 rounded-lg transition-all duration-200'
        onClick={() => (dispatch(logout(navigate)))} 
        >
        <VscSignOut className="text-lg" />
          Logout
        </div>
      </div>
    }
    </div>
  </div>)
}

import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarLink } from './SideBarLink';
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/Thunks';
import { Modal } from '../../common/Modal';


export const SideBar = () => {
  const user = useSelector((state) => (state.profile.user));
//   console.log("SideBar", user);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (<div className='bg-richblack-800 min-h-screen pt-8 flex flex-col items-center gap-3'>
    <div>
        {
            sidebarLinks.map((link) => {
                if(link.type && user.accountType !== link.type){
                    return null;
                }
                return (<SideBarLink key={link.id} link={link} iconName={link.icon}/>)
            })
        }
    </div>
    <div className='w-[190px] bg-richblack-600 h-[2px]'></div>
    <div>
        <SideBarLink 
        link={{name : "Settings", path : "/dashboard/settings"}} 
        iconName={"VscSettingsGear"}/>
        <button className='flex text-richblack-300 items-center w-[222px] h-[38px] px-4 gap-3'
        onClick={()=> setConfirmationModal({
            text1: "Are you sure?",
            text2: "You will be logged out of your account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null),
        })}
        >
            <VscSignOut />
            Log Out
        </button>
    </div>
    {
        confirmationModal && (<Modal modalData={confirmationModal}/>)
    }
  </div>)
}

 
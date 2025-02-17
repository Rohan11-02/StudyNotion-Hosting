import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'

export const SideBarLink = ({link, iconName}) => {

  const Icon = Icons[iconName];
  const location = useLocation();

  return (<Link to={link.path} className={`flex items-center ${link.path === location.pathname 
  ? "bg-yellow-800 text-yellow-50 border-l-2" 
  : "text-richblack-300"} w-[222px] h-[38px]`}>
    <div className='flex items-center w-full px-4 gap-3'>
        <Icon className="text-base"/>
        <div>{link.name}</div>
    </div>
  </Link>)
}

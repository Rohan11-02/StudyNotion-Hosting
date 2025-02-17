import React from 'react'
import { SideBar } from '../components/core/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  return (<div className='flex'>
    <SideBar/>
    <div>
        <Outlet/>
    </div>
  </div>)
}

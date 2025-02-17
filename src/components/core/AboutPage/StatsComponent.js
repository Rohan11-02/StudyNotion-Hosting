import React from 'react'


const stats = [
    {
        count : "5K",
        value : "Active Students",
    },
    {
        count : "10+",
        value : "Mentors",
    },
    {
        count : "200+",
        value : "Courses",
    },
    {
        count : "50+",
        value : "Awards",
    },
]

export const StatsComponent = () => {
  return (<div className='flex w-screen justify-center h-[154px] items-center bg-richblack-800'>
    {
        stats.map((stat, index) => {
            return (<div className='w-[290px] h-[74px] flex flex-col items-center justify-center' key={index}>
                <p className='text-richblack-5 text-3xl'>{stat.count}</p>
                <p className='text-richblack-500 text-base'>{stat.value}</p>
            </div>)
        })
    }
  </div>)
}

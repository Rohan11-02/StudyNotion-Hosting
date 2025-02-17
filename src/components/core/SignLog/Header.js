import React from 'react'

export const Header = ({data}) => {
    // console.log(data);
  return (<div className='flex flex-col gap-3'>
    <h2 className='text-richblack-5 text-3xl'>
          {
            data.heading
          }
        </h2>
        <p className='text-richblack-100 text-lg'>
          {
            data.subHeading
          }
          <span className='italic text-blue-100 text-base'>
            {" "}
            {
              data.subHeadingPortion
            }
          </span>
        </p>
  </div>)
}

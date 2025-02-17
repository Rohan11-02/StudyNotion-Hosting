import React from 'react'
import foundingStory from "../../../assets/Images/FoundingStory.png"

export const FoundingStory = () => {
  return (<div>
    <div className='flex items-center gap-4'>
        <div className='w-[486px] h-[372px] pr-2 flex flex-col gap-4'>
            <p className='text-4xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent'>Our Founding Story</p>
            <div className='text-richblack-300 text-base'>
            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </div>
            <div className='text-richblack-300 text-base'>
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </div>
        </div>
        <img src={foundingStory} alt='' className='w-[534px] h-[342px] p-4'/>
    </div>
    <div className='flex gap-6 mt-16'>
      <div className='w-[486px] h-[212px]'>
        <p className='text-4xl bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'>Our Vision</p>
        <div className='text-richblack-300'>
          With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
        </div>
      </div>
      <div className='w-[486px] h-[236px]'>
        <p className='text-4xl bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>Our Mission</p>
        <div className='text-richblack-300'>
          our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
        </div>
      </div>
    </div>
  </div>)
}

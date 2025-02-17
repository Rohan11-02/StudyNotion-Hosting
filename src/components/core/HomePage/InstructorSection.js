import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png";
import { HighLightText } from './HighLightText';
import { CTAButton } from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';

export const InstructorSection = () => {
  return (<div className='py-16 flex'>
   <div className='flex w-[1200px] max-w-[11/12] mx-auto items-center justify-evenly'>
    <div className='relative w-[626px]'>
            <div className='w-[550px] h-[494px] bg-white absolute bottom-2 -left-3'></div>
            <img src={Instructor} alt='' className='w-[550px] z-10 relative'/>
        </div>
        <div className='flex flex-col items-start justify-evenly w-[486px] h-[284px]'>
            <p className='text-4xl text-white'>Become an <HighLightText text={"instructor"}/></p>
            <p className='text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                    Start Teaching Today
                    <FaArrowRight/>
                </div>
            </CTAButton>
        </div>
   </div>
  </div>)
}

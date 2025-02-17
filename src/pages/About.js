import React from 'react'
import { HighLightText } from '../components/core/HomePage/HighLightText'
import AboutUs1 from "../assets/Images/aboutus1.webp"
import AboutUs2 from "../assets/Images/aboutus2.webp"
import AboutUs3 from "../assets/Images/aboutus3.webp"
import { Quote } from '../components/core/AboutPage/Quote'
import { FoundingStory } from '../components/core/AboutPage/FoundingStory'
import { StatsComponent } from '../components/core/AboutPage/StatsComponent'
import Footer from '../components/common/Footer'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactFormSection } from '../components/core/AboutPage/ContactFormSection'
import { ReviewSlider } from '../components/common/ReviewSlider'



export const About = () => {

  return (<div className='flex flex-col items-center bg-richblack-900'>
    <div className='w-screen h-[610px] bg-richblack-800 flex justify-center pt-16'>
        <div className='text-richblack-200 text-base w-10/12 flex flex-col gap-3 items-center'>
            <p className='text-center'>About us</p>
            <div className='w-[910px] p-4 px-[70px]'>
                <div className='text-richblack-5 text-4xl text-center mb-4'>
                    Driving Innovation in Online Education for a 
                    <br/>
                    <HighLightText text={"Brighter Future"}/>
                </div>
                <div className='text-richblack-300 text-base text-center'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter 
                    future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </div>
            </div>
        </div>
    </div>
    <div className='relative w-full flex justify-center'>
        <div className='flex absolute -bottom-16 gap-4'>
            <img src={AboutUs1} alt=''/>
            <img src={AboutUs2} alt=''/>
            <img src={AboutUs3} alt=''/>
        </div>
    </div>
    <div className='w-10/12 text-richblack-100 pt-32'>   
        <Quote/>
    </div>
    <div className='pt-10'>
        <FoundingStory/>
    </div>
    <div>
        <StatsComponent/>
    </div>

    <div className='w-10/12'>
        <LearningGrid/>
    </div>

    <div>
        <ContactFormSection/>
    </div>

    <div className='lg:w-[1260px]'>
        <div className='text-richblack-5 text-4xl text-center'>Reviews from other learners</div>
        <ReviewSlider/>
    </div>

    <div className='w-screen'>
        <Footer/>
    </div>
  </div>)
}

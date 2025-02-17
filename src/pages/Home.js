import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { HighLightText } from '../components/core/HomePage/HighLightText';
import { CTAButton } from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import { TimeLine } from '../components/core/HomePage/TimeLine';
import timeLineImage from "../assets/Images/TimelineImage.png";
import knowYourProgress from "../assets/Images/Know_your_progress.svg";
import compareWithOthers from "../assets/Images/Compare_with_others.svg";
import planYourLessons from "../assets/Images/Plan_your_lessons.svg";
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';
import { ReviewSlider } from '../components/common/ReviewSlider';

export const Home = () => {
  return (<div>
    {/* Section 1 */}
    <div className='bg-richblack-900 min-h-min pt-10'>
        <div className='max-w-screen w-[64%] border mx-auto flex items-center flex-col'>
            <Link to={"/signup"}>
                <div className='flex w-[235px] h-[44px] items-center gap-2 border rounded-[500px] justify-center bg-richblack-800 text-richblack-200'>
                    Become an Instructor
                    <FaArrowRight />
                </div>
            </Link>

            <div className='text-white text-4xl mt-8'>
                Empower Your Future with <HighLightText text={"Coding Skills"}/>
            </div>

            <div className='text-richblack-300 text-center mt-5'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-6 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>

        </div>
        <div className='relative w-screen flex justify-center mt-12'>
            <video
                muted
                loop
                autoPlay
                className='w-[65%] z-10'
                >
                <source src={Banner} type='video/mp4'/>
            </video>
            <div className='absolute w-[64%] h-[98.8%] bg-white right-[16.7%] top-[3.5%]'></div>
        </div>

        <div>
            <CodeBlocks 
                position={"flex-row"}
                heading={
                    <div className='text-white text-4xl'>
                        Unlock your <HighLightText text={"coding potential"}/> with our online courses.
                    </div>
                }
                subHeading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctaBtn1={
                    {
                        btnText : "Try it Yourself",
                        active : true,
                        linkto : "/signup"
                    }
                }
                ctaBtn2={
                    {
                        btnText : "Learn More",
                        active : false,
                        linkto : "/login"
                    }
                }
                codeBlock={
                    `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                }
            />
        </div>
        <div className='border -mt-12'>
            <CodeBlocks 
                position={"flex-row-reverse"}
                heading={
                    <div className='text-white text-4xl'>
                        Start <HighLightText text={"coding in seconds"}/>
                    </div>
                }
                subHeading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctaBtn1={
                    {
                        btnText : "Try it Yourself",
                        active : true,
                        linkto : "/signup"
                    }
                }
                ctaBtn2={
                    {
                        btnText : "Learn More",
                        active : false,
                        linkto : "/login"
                    }
                }
                codeBlock={
                    `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                }
            />
        </div>

        <div className='w-[1200px] max-w-[11/12] mx-auto'>
            <ExploreMore/>
        </div>
    </div>

    {/* Section 2 */}
    <div className='w-screen bg-pure-greys-5'>
        <div className='homepage_bg h-[280px] flex items-center justify-center gap-10'>
            <CTAButton active={true} linkto={"signup"}>
                <div className='flex items-center gap-2'>
                    Explore Full Catalog
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={false} linkto={"login"}>
                Learn More
            </CTAButton>
        </div>

        <div className='w-[1200px] max-w-[11/12] flex mx-auto justify-evenly mt-8'>
            <div className='w-[40%] text-4xl'>
                Get the skills you need for a <HighLightText text={"job that is in demand."}/>
            </div>
            <div className='w-[40%] flex flex-col items-start gap-6'>
                <p>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </p>
                <CTAButton active={true} linkto={"/login"}>
                    Learn More
                </CTAButton>
            </div>
        </div>

        <div className='w-[1200px] max-w-[11/12] mx-auto flex justify-evenly mt-12'>
            <TimeLine/>
            <div className='w-[714px] relative'>
                <div className='absolute w-[100%] h-[536px] bg-white top-[3%] -right-[1.7%]'></div>
                <div>
                    <img src={timeLineImage} alt='' className='relative z-10'/>
                </div>
                <div className='w-[511px] h-[128px] bg-caribbeangreen-700 absolute flex justify-center items-center gap-16 -bottom-[10%] left-[13.6%] z-20'>
                    <div className='w-[162px] flex gap-4'>
                        <div className='text-white text-4xl'>10</div>
                        <div className='text-caribbeangreen-300 text-md'>YEARS EXPERIENCES</div>
                    </div>

                    <div className='border text-caribbeangreen-500 h-[44px]'></div>

                    <div className='w-[162px] flex gap-4'>
                        <div className='text-white text-4xl'>250</div>
                        <div className='text-caribbeangreen-300 text-md'>TYPES OF COURSES</div>
                    </div>
                </div>
            </div>
        </div>

        <div className='mt-24 flex flex-col justify-center items-center py-16'>
            <div className='w-[760px] mx-auto text-center px-8'>
                <div className='text-4xl'>Your swiss knife for <HighLightText text={"learning any language"}/></div>
                <div className='text-richblack-700'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
            </div>
            <div className='flex w-[1102px] mx-auto'>
                <img src={knowYourProgress} alt='' className='relative'/>
                <img src={compareWithOthers} alt='' className='relative right-32'/>
                <img src={planYourLessons} alt='' className='relative right-[278px]'/>
            </div>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>
        </div>
    </div>
 
    {/* Section 3 */}
    <div className='bg-richblack-900'>
        <InstructorSection/>
    </div>
    <div className='bg-richblack-900 '>  
        {/* Reviews From Other Learners */}
        <div className="text-center text-4xl font-semibold text-richblack-5">
            Reviews from other learners
        </div>
        <div className='w-screen ml-20'>
            <ReviewSlider/>
        </div>
    </div>

    {/* Footer */}
    <Footer/>
  </div>)
}

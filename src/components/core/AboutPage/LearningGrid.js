import React from 'react'
import { CTAButton } from '../HomePage/CTAButton';



const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "The learning process uses the namely online and offline.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
];

export const LearningGrid = () => {
  return (<div className='grid grid-cols-4 mt-24'>
    {
        LearningGridArray.map((data, index) => {
            return (<div key={index} className={`${data.order < 0 ? "col-span-2" : "col-span-1"}
            ${data.order%2 !== 0 ? "bg-richblack-700" : "bg-richblack-800"}
            ${data.order === 3 && "col-start-2"}
            ${data.order < 0 && "bg-transparent"} h-[280px]`}>
                {
                    data.order < 0 
                    ? (<div>
                        <div className='w-[540px] flex flex-col gap-7'>
                            <div className='text-4xl text-richblack-5'>
                                {data.heading} <span className='bg-gradient-to-br from-[#5433FF] via-[#20BDFF] to-[#A5FECB] bg-clip-text text-transparent'>{data.highlightText}</span>
                            </div>
                            <div className='text-richblack-300'>
                                {data.description}
                            </div>
                            <div className='w-[138px]'>
                                <CTAButton active={true} linkto={data.BtnLink}>
                                    {data.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    </div>)
                    : (<div className='p-10 flex flex-col gap-7'>
                        <p className='text-richblack-5 text-lg font-inter'>
                            {data.heading}
                        </p>
                        <p className='text-richblack-100 text-sm font-inter'>
                            {data.description}
                        </p>
                    </div>)
                }
            </div>)
        })
    }
  </div>)
}

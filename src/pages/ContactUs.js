import React from 'react'
import { ContactUsForm } from '../components/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'
import { ReviewSlider } from '../components/common/ReviewSlider'


const array = [
    {
        icon : <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.91307 0.658231C5.9877 0.38888 8.10296 0.25 10.2503 0.25C12.3974 0.25 14.5124 0.388852 16.5869 0.65815C18.5091 0.907693 19.8783 2.51937 19.9923 4.38495C19.6665 4.27614 19.3212 4.20396 18.96 4.17399C17.5715 4.05874 16.1673 4 14.75 4C13.3326 4 11.9285 4.05874 10.54 4.17398C8.1817 4.36971 6.5 6.36467 6.5 8.60821V12.8937C6.5 14.5844 7.45468 16.1326 8.9328 16.8779L6.28033 19.5303C6.06583 19.7448 5.74324 19.809 5.46299 19.6929C5.18273 19.5768 5 19.3033 5 19V14.9705C4.63649 14.9316 4.27417 14.8887 3.91308 14.8418C1.90466 14.581 0.5 12.8333 0.5 10.8626V4.63738C0.5 2.66672 1.90466 0.918985 3.91307 0.658231Z" fill="#AFB2BF"/>
        <path d="M14.75 5.5C13.3741 5.5 12.0114 5.55702 10.6641 5.66884C9.12476 5.7966 8 7.10282 8 8.60821V12.8937C8 14.4014 9.12797 15.7083 10.6692 15.8341C11.9131 15.9357 13.17 15.9912 14.4384 15.999L17.2197 18.7803C17.4342 18.9948 17.7568 19.059 18.037 18.9429C18.3173 18.8268 18.5 18.5533 18.5 18.25V15.8601C18.6103 15.8518 18.7206 15.8432 18.8307 15.8342C20.372 15.7085 21.5 14.4015 21.5 12.8938V8.60822C21.5 7.10283 20.3752 5.79661 18.836 5.66885C17.4886 5.55702 16.1259 5.5 14.75 5.5Z" fill="#AFB2BF"/>
        </svg>,
        heading : "Chat on us",
        subHeading : "Our friendly team is here to help.",
        info : "@mail address",   
    },
    {
        icon : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-richblack-100 w-6 h-6">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clipRule="evenodd" />
        </svg>,
        heading : "Visit us",
        subHeading : "Come and say hello at our office HQ.",
        info : "Here is the location/ address",
    },
    {
        icon : <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 3.5C0.5 1.84315 1.84315 0.5 3.5 0.5H4.87163C5.732 0.5 6.48197 1.08556 6.69064 1.92025L7.79644 6.34343C7.97941 7.0753 7.70594 7.84555 7.10242 8.29818L5.8088 9.2684C5.67447 9.36915 5.64527 9.51668 5.683 9.61969C6.81851 12.7195 9.28051 15.1815 12.3803 16.317C12.4833 16.3547 12.6309 16.3255 12.7316 16.1912L13.7018 14.8976C14.1545 14.2941 14.9247 14.0206 15.6566 14.2036L20.0798 15.3094C20.9144 15.518 21.5 16.268 21.5 17.1284V18.5C21.5 20.1569 20.1569 21.5 18.5 21.5H16.25C7.55151 21.5 0.5 14.4485 0.5 5.75V3.5Z" fill="#AFB2BF"/>
        </svg>,
        heading : "Call us",
        subHeading : "Mon - Fri From 8am to 5pm",
        info : "+123 456 7890"
        
    }
]

export const ContactUs = () => {
  return (<div className='min-h-screen bg-richblack-900 flex flex-col items-center justify-center'>
    <div className='flex justify-center gap-14 pt-24'>
        <div className='w-[450px] h-[390px] bg-richblack-800 rounded-xl flex flex-col justify-center items-center'>
            {
                array.map((element, index) => {
                    return (<div key={index} className='flex gap-8 p-4 w-[402px] h-[98px]'>
                        <div className='pt-1'>
                            {element.icon}
                        </div>
                        <div>
                            <p className='text-richblack-5 text-lg'>{element.heading}</p>
                            <p className='text-richblack-200 text-sm'>{element.subHeading}</p>
                            <p className='text-richblack-200 text-sm'>{element.info}</p>
                        </div>
                    </div>)
                })
            }
        </div>
        <div className='w-[698px] h-[799px] px-20 py-10 border border-richblack-600 rounded-xl'>
            <div className='text-4xl text-richblack-5'>Got a Idea? We've got the skills. Let's team up</div>
            <div className='text-base text-richblack-300'>Tall us more about yourself and what you're got in mind.</div>
            <ContactUsForm/>
        </div>
    </div>

    <div className='mt-20 lg:w-[1260px]'>
        <div className='text-richblack-5 text-4xl text-center'>
            Reviews from other learners
        </div>
        <ReviewSlider/>
    </div>
    <div className='w-screen mt-14'>
        <Footer/>
    </div>
  </div>)
}

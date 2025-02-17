import React from 'react'
import { ContactUsForm } from '../../ContactPage/ContactUsForm'

export const ContactFormSection = () => {
  return (<div className='mb-24'>
    <div className='flex flex-col items-center mt-24'>
        <div className='text-4xl text-richblack-5'>
            Get in Touch
        </div>
        <div className='text-richblack-300 text-base'>
            We'd love to here for you, Please fill out this form.
        </div>
    </div>
    <div>
        <ContactUsForm/>
    </div>
  </div>)
}

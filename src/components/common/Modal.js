import React from 'react'
import { CTAButton } from '../core/HomePage/CTAButton'

export const Modal = ({modalData}) => {

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">{modalData.text1}</p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData.text2}</p>
        <div className="flex items-center gap-x-4 justify-between">
          <div onClick={modalData.btn1Handler}>
            <CTAButton active={true} type='submit'>
              {modalData.btn1Text}
            </CTAButton>
          </div>
          <div className="rounded-lg py-[12px] px-[24px] bg-richblack-300 text-richblack-900
          hover:scale-95 transition-all duration-200" onClick={modalData.btn2Handler}>
            {modalData.btn2Text}
          </div>
        </div>
      </div>
    </div>
  )
}

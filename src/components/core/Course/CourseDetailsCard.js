import React from 'react'
import { CTAButton } from '../HomePage/CTAButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaShareSquare } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import { BsFillCaretRightFill } from 'react-icons/bs';

export const CourseDetailsCard = ({course, handleBuyCourse, handleAddToCart}) => {

  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to ClipBoard.");
  }

  return (
    <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
        <img
            src={course?.thumbnail}
            alt=''
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />
        <div className="px-4">
            <div className="space-x-3 pb-4 text-3xl font-semibold">
                Rs. {course?.price}
            </div>
            <div className="flex flex-col gap-4">
                <div onClick={user && course?.studentsEnrolled.includes(user?._id) ?
                () => navigate("/dashboard/enrolled-courses") :
                handleBuyCourse
                }>
                    <CTAButton active={true} type='submit'>
                        {
                            user && course?.studentsEnrolled.includes(user?._id) ? 
                            "Go to Course" : 
                            "Buy Now"
                        }
                    </CTAButton>
                </div>
                {
                    ((!course?.studentsEnrolled?.includes(user?._id)) && 
                    (<div onClick={handleAddToCart}>
                        <CTAButton active={false} type='submit'>
                            Add To Cart
                        </CTAButton>
                    </div>))
                }
            </div>
            
            <div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                    30-Day Money-Back Guarantee
                </p>
            </div>
            <div>
                <p className={`my-2 text-xl font-semibold `}>
                    This Course Includes:
                </p>
                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                    {
                        course && JSON.parse(course?.instructions)?.map((item, index) => {
                            return (<p className={`flex items-center gap-2`} key={index}>
                                <BsFillCaretRightFill/>
                                {item}
                            </p>)
                        })
                    }
                </div>
            </div>
            <div className="text-center">
                <button
                    className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                    onClick={handleShare}
                >
                    <FaShareSquare size={15}/>
                    Share
                </button>
            </div>
        </div>
    </div>
  )
}

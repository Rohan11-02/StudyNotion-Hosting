import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../redux/slices/cartSlice';
import GetAvgRating from '../../../../utils/avgRating';



export const RenderCartCourses = () => {

  const cart = useSelector((state) => (state.cart.cart));
  const dispatch = useDispatch();
  const [rating_Arr, setRating_Arr] = useState([]);

  const getRatingArray = () => {
    const arr = cart.map((item) => GetAvgRating(item.ratingAndReview));
    setRating_Arr(arr);
  }

  useEffect(()=> {
    getRatingArray();
  }, [])

    
  return (<div className="flex flex-1 flex-col">
    {
        cart.map((course, index) => {
            return (<div key={index}
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                } ${index !== 0 && "mt-6"} `}>

                <div className="flex flex-1 flex-col xl:justify-between gap-4 xl:flex-row">
                    <img src={course.thumbnail} alt='' className="h-[148px] w-[220px] rounded-lg object-cover"/>
                    <div className="flex flex-col space-y-1 w-[210px]">
                        <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{rating_Arr?.[index]}</span>
                        <ReactStars
                        key={rating_Arr?.[index]}
                        count={5}
                        value={rating_Arr?.[index]}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        />
                        <span className="text-richblack-400">{course?.ratingAndReview?.length} Ratings</span>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {course?.price} </p>
                </div>
            </div>)
        })
    }
  </div>)
}

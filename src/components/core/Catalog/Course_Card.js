import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import { RatingStars } from '../../common/RatingStars';

export const Course_Card = ({course}) => {
    
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReview);
    // console.log("Printing count", count);
    setAvgReviewCount(count);
  }, [course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img
                        src={course.thumbnail}
                        alt=''
                        className={`h-[400px] w-full rounded-xl object-cover `}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course.courseName}</p>
                    <p className="text-sm text-richblack-50">{course?.instructor?.fName} {course?.instructor?.lName}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-5">{avgReviewCount || 0}</span>
                      <div className='text-richblack-5'>
                        <RatingStars Review_Count={avgReviewCount}/>
                      </div>
                      <span className="text-richblack-400">{course?.ratingAndReview?.length} Ratings</span>
                    </div>
                    <div className="text-xl text-richblack-5">₹ {course?.price}</div>
                </div>
            </div>
        </Link>
    </div>
  )
}

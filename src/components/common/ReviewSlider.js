import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Pagination}  from 'swiper/modules'
import { getAllRatings } from '../../services/operations/courseDetailsAPI';


export const ReviewSlider = () => {

  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const FindAllRatingAndReviews = async() => {
        const result = await getAllRatings();
        if(result){
            setReviews(result);
        }
    }
    FindAllRatingAndReviews();
  }, [])


  return (
    <div className="text-white">
        <div className="mt-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
            <Swiper
                slidesPerView={4}
                spaceBetween={25}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="w-full"
            >
                {
                    reviews?.map((review, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review?.user?.image}
                                            alt=''
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <h2 className="font-semibold text-richblack-5">{`${review?.user?.fName} ${review?.user?.lName}`}</h2>
                                            <h2 className="text-[12px] font-medium text-richblack-500">{review?.courseId?.courseName}</h2>
                                        </div>
                                    </div>
                                    <p className="font-medium text-richblack-25">
                                        {
                                            review?.review?.split(" ").length > truncateWords ?
                                            `${review?.review
                                                .split(" ")
                                                .slice(0, truncateWords)
                                                .join(" ")}...` :
                                            `${review?.review}`
                                        }
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold text-yellow-100">
                                            {review?.rating?.toFixed(1)}
                                        </div>
                                        <ReactStars
                                            count={5}
                                            value={review?.rating}
                                            size={20}
                                            edit={false}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    </div>
  )
}

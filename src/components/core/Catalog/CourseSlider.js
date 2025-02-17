import React from 'react'
import {Swiper} from 'swiper/react'
import { SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination}  from 'swiper/modules'
import { Course_Card } from './Course_Card'

export const CourseSlider = ({Courses}) => {
  return (
    <div>
        <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={200}
            pagination={true}
            modules={[Autoplay,Pagination,Navigation]}
            className="mySwiper"
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
                1024:{slidesPerView:3,}
            }}
        >
        {
            Courses?.map((course, index)=> (
                <SwiperSlide key={index}>
                    <Course_Card course={course}/>
                </SwiperSlide>
            ))
        }   
        </Swiper>
    </div>
  )
}

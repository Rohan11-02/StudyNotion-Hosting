import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { CTAButton } from '../components/core/HomePage/CTAButton';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import { RatingStars } from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import { CourseDetailsCard } from '../components/core/Course/CourseDetailsCard';
import { Modal } from '../components/common/Modal';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constants';
import { addToCart } from '../redux/slices/cartSlice';
// import ReactMarkdown from 'react-markdown';
import { CourseAccordionBar } from '../components/core/Course/CourseAccordionBar';
import Footer from '../components/common/Footer';
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"



export const CourseDetails = () => {

  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));


  const getCourseFullDetails = async() => {
    try{
      const result = await fetchCourseDetails(courseId);
      // console.log("Printing CourseData-> " , result);
      setCourseData(result);
    }
    catch(err){
      console.log("Could not fetch course details");
    }
  }

  useEffect(() => {
    getCourseFullDetails();
  }, [courseId])

  useEffect(() => {
    if(courseData){
      const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReview);
      setAvgReviewCount(count);
    }
  },[courseData])

  useEffect(() => {
    if(courseData){
      let lectures = 0;
      courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0
      })
      setTotalNoOfLectures(lectures);
    }
  }, [courseData])


  const handleBuyCourse = async() => {
    if(token){
        await buyCourse(token, [courseId], user, navigate, dispatch);
        return;
    }

    setConfirmationModal({
      text1 : "You are not Logged In",
      text2 : "Please Login to Purchase the Course",
      btn1Text : "Login",
      btn2Text : "Cancel",
      btn1Handler : () => navigate("/login"),
      btn2Handler : () => setConfirmationModal(null)
    })
  }

  const handleAddToCart = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an Instructor, you cant buy a course");
        return;
    }
    if(token){
        // console.log("dispatching add to cart")
        dispatch(addToCart(courseData?.data?.courseDetails));
        return;
    }
    setConfirmationModal({
        text1 : "You are not Logged In",
        text2 : "Please Login to Add to Cart",
        btn1Text : "Login",
        btn2Text : "Cancel",
        btn1Handler : () => navigate("/login"),
        btn2Handler : () => setConfirmationModal(null)
    })
  }

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ?
      isActive.concat([id]) : 
      isActive.filter((e) => e !== id)
    )
  }


  return (<div className='bg-richblack-800'>
    <div className={`relative w-full bg-richblack-800`}>
      {/* Hero Section */}
      <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
        <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
          <div className="relative block max-h-[30rem] lg:hidden">
            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            <img
              src={courseData?.data?.courseDetails?.thumbnail}
              alt="course thumbnail"
              className="aspect-auto w-full"
            />
          </div>
          <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
            <div>
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                {courseData?.data?.courseDetails?.courseName}
              </p>
            </div>
            <p className={`text-richblack-200`}>
              {courseData?.data?.courseDetails?.description}
            </p>
            <div className="text-md flex flex-wrap items-center gap-2">
              <span className="text-yellow-25">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
              <span>{`${courseData?.data?.courseDetails?.ratingAndReview?.length} Reviews`}</span>
              <span>{`${courseData?.data?.courseDetails?.studentsEnrolled?.length} Students Enrolled`}</span>
            </div>
            <div>
              <p>
                Created By {courseData?.data?.courseDetails.instructor.fName}{" "} 
                {courseData?.data?.courseDetails.instructor.lName}
              </p>
            </div>
            <div className="flex flex-wrap gap-5 text-lg">
              <p className="flex items-center gap-2">
                {" "}
                <BiInfoCircle/> Created At {formatDate(courseData?.data?.courseDetails.createdAt)}
              </p>
              <p className="flex items-center gap-2">
                {" "}
                <HiOutlineGlobeAlt/> English
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
              Rs. {courseData?.data?.courseDetails?.price}
            </p>
            <div onClick={user && courseData?.data?.courseDetails?.studentsEnrolled.includes(user?._id) ?
            () => navigate("/dashboard/enrolled-courses") : 
            handleBuyCourse
            }>
              <CTAButton active={true} type='submit'>
                {
                  user && courseData?.data?.courseDetails?.studentsEnrolled.includes(user?._id) ? 
                  "Go to Course" : 
                  "Buy Now"
                }
              </CTAButton>
            </div>
            <div>
              {
                ((!courseData?.data?.courseDetails?.studentsEnrolled.includes(user?._id) && (
                  <div onClick={handleAddToCart}>
                    <CTAButton active={false} type='submit'>
                      Add To Cart
                    </CTAButton>
                  </div>
                )))
              }
            </div>
          </div>
        </div>
        {/* Course Card */}
        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
          <CourseDetailsCard
            course={courseData?.data?.courseDetails}
            handleBuyCourse={handleBuyCourse}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>

    <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
      <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
        {/* What You Will Learn Section */}
        <div className="my-8 border border-richblack-600 p-8">
          <p className="text-3xl font-semibold">What You'll Learn</p>
            <div className="mt-5">
              {/* <ReactMarkdown>{courseData?.data?.courseDetails?.whatYouWillLearn}</ReactMarkdown> */}
              <p>{courseData?.data?.courseDetails?.whatYouWillLearn}</p>
            </div>
        </div>
        {/* Course Content Section */}
        <div className="max-w-[830px] ">
          <div className="flex flex-col gap-3">
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <span>{courseData?.data?.courseDetails?.courseContent?.length} Sections(s)</span>
                <span>{totalNoOfLectures} Lectures</span>
                <span>{courseData?.data?.totalDuration} Total Length</span>
              </div>
              <div>
                <button
                  className="text-yellow-25"
                  onClick={() => setIsActive([])}
                >
                  Collapse All Sections
                </button>
              </div>
            </div>
          </div>
          {/* Course Details Accordion */}
          <div className="py-4">
            {
              courseData?.data?.courseDetails?.courseContent?.map((section, index) => (
                <CourseAccordionBar
                  section={section}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))
            }
          </div>

          {/* Author Details */}
          <div className="mb-12 py-4">
            <p className="text-[28px] font-semibold">Author</p>
            <div className="flex items-center gap-4 py-4">
              <img
                src={courseData?.data?.courseDetails?.instructor?.image}
                alt='Author'
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg">{courseData?.data?.courseDetails.instructor.fName}{" "} 
              {courseData?.data?.courseDetails.instructor.lName}</p>
            </div>
            <p className="text-richblack-50">
              {courseData?.data?.courseDetails?.instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    {confirmationModal && <Modal modalData={confirmationModal}/>}
  </div>)
}

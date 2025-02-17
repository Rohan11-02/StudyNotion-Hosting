import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackSharp } from "react-icons/io5";
import { CTAButton } from '../../HomePage/CTAButton';
import { useSelector } from 'react-redux';
import { BsChevronDown } from 'react-icons/bs';

export const VideoDetailsSidebar = ({setReviewModal}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const {sectionId, subSectionId} = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const {
    courseData, 
    sectionData, 
    completedLectures, 
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse);
  // console.log("Inside VideoDetailsSideBar printing sectionData", sectionData);

  const setActiveFlags = () => {
    if(!sectionData.length){
      return;
    }
    
    const currentSectionIndex = sectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = sectionData?.[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );

    const activeSubSectionId = sectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
    setActiveStatus(sectionData?.[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);

    // Below Code Works same as Above one
      // setActiveStatus(sectionId);
      // setVideoBarActive(subSectionId);
  }

  useEffect(() => {
    setActiveFlags();
  }, [sectionData, courseData, location.pathname])

  return (
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* For Buttons and Heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* For Buttons */}
          <div className="flex w-full items-center justify-between ">
            <div onClick={() => navigate("/dashboard/enrolled-courses")} title='Back'
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90">
              <IoArrowBackSharp size={30}/>
            </div>
            <div onClick={() => setReviewModal(true)}>
              <CTAButton active={true} type='submit'>
                Add Review
              </CTAButton>
            </div>
          </div>
          {/* For Headings and Titles */}
          <div className="flex flex-col">
            <div>{courseData?.courseName}</div>
            <div className="text-sm font-semibold text-richblack-500">{completedLectures.length} / {totalNoOfLectures}</div>
          </div>
        </div>
        {/* For Sections and SubSections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {
            sectionData?.map((section, index) => {
              return (<div 
                key={index}
                onClick={() => setActiveStatus(section._id)}
                className="mt-2 cursor-pointer text-sm text-richblack-5"
              >
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                  <div className="w-[70%] font-semibold">
                    {section?.sectionName}
                  </div>
                  {/* HW- add icon here and handle rotate 180 logic */}
                  <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                    <span
                      className={`${
                        activeStatus === section?._id
                          ? "rotate-0"
                          : "rotate-180"
                      } transition-all duration-500`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>
                </div>
                {/* subSections */}
                <div>
                  {
                    activeStatus === section._id && (
                      <div className="transition-[height] duration-500 ease-in-out">
                        {
                          section.subSection.map((topic, index) => {
                          return (<div
                            key={index}
                            className={`flex gap-3  px-5 py-2 ${
                              videoBarActive === topic._id
                              ? "bg-yellow-200 font-semibold text-richblack-800"
                              : "hover:bg-richblack-900"
                              } `}
                            onClick={() => {
                              navigate(`/view-course/${courseData._id}/section/${section._id}/subSection/${topic._id}`);
                              setVideoBarActive(topic._id)
                            }}
                          >
                            <input
                              type='checkbox'
                              onChange={() => {}}
                              checked={completedLectures.includes(topic._id)}
                            />
                            <span>{topic.title}</span>
                          </div>)
                          })
                        }
                      </div>
                    )
                  }
                </div>
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

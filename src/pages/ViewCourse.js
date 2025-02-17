import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { VideoDetailsSidebar } from '../components/core/Dashboard/ViewCourse/VideoDetailsSidebar';
import { CourseReviewModal } from '../components/core/Dashboard/ViewCourse/CourseReviewModal';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseData, setSectionData, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';

export const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {courseId} = useParams();

  const setCourseSpecificDetails = async() => {
    const courseData = await getFullDetailsOfCourse({courseId}, token);
    // console.log("Printing inside ViewCourse", courseData);
    dispatch(setSectionData(courseData?.courseDetails?.courseContent));
    dispatch(setCourseData(courseData?.courseDetails));
    dispatch(setCompletedLectures(courseData?.completedVideos));
    let lectures = 0
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length
    })
    dispatch(setTotalNoOfLectures(lectures));
  }  

  useEffect(() => {
    setCourseSpecificDetails();
  }, [])
  return (
    <div>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal}/>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet/>
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </div>
  )
}

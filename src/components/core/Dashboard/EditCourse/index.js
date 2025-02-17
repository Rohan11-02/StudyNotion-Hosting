import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RenderSteps } from '../AddCourse/RenderSteps';
import { useLocation, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../redux/slices/courseSlice';

export const EditCourse = () => {

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  // const location = useLocation();
  // console.log("inside editCourse", location);
  // const courseId = location.pathname.split("/").at(-1);

  const courseId = useParams();


  const fetchFullCourseDetails = async() => {
    const result = await getFullDetailsOfCourse(courseId, token)
    // console.log("Inside EditCourse Function", result.courseDetails);
    if(result){
      dispatch(setEditCourse(true));
      dispatch(setCourse(result?.courseDetails));
    }
  }

  useEffect(() => {
    fetchFullCourseDetails();
  }, [])

  return (<div>
    <h2>Edit Course</h2>
    <div>
      {
        course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
      }
    </div>
  </div>)
}

import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../common/Spinner';

export const EnrolledCourses = () => {

  const token = useSelector((state) => (state.auth.token));
  const navigate = useNavigate();
  
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async() => {
    try{
        const response = await getUserEnrolledCourses(token);
        setEnrolledCourses(response);
        // console.log("Printing response inside EnrolledCourses", response);
    }
    catch(err){
        console.log("Unable to Fetch Enrolled Courses");
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  },[])

  return (<div className='bg-richblack-900 w-[calc(100vw-10%)] min-h-screen pl-20 pt-10 flex flex-col gap-8 text-white'>
    <div className="text-3xl text-richblack-50">
        Enrolled Courses
    </div>
    {
        !enrolledCourses ? (<div className="grid min-h-[calc(100vh-3.5rem)] relative top-[250px] left-[400px]">
            <Spinner/>
        </div>) : !enrolledCourses.length ? 
        (<p className="grid h-[10vh] text-2xl text-richblack-100">
            You have not Enrolled in Any Course Yet
        </p>) : 
        (<div className="my-8 text-richblack-5 w-[80%]">
            <div className="flex rounded-t-lg bg-richblack-500 ">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Durations</p>
                <p className="flex-1 px-2 py-3">Progress</p>
            </div>

            {
                enrolledCourses.map((course, index, arr) => {
                    return (
                        <div 
                            className={`flex items-center border border-richblack-700 
                            ${index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`}
                            key={index}
                        >
                            <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                            onClick={() => navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/subSection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                <img
                                    src={course?.thumbnail}
                                    alt="course_img"
                                    className="h-14 w-14 rounded-lg object-cover"     
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course?.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {
                                            course?.description?.length > 50 
                                            ? `${course?.description?.slice(0, 50)}...` 
                                            : course.description
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress : {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>)
    }
  </div>)
}

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { InstructorChart } from './InstructorDashboard/InstructorChart';
import { Link } from 'react-router-dom';

export const Instructor = () => {

  const {user} = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const [instructorData, setInstructorData] = useState(null);


  useEffect(() => {
    const findInstructorData = async() => {
        setLoading(true);
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);
        // console.log("Printing inside Instructor function", instructorApiData);
        // console.log("Printing result", result.instructorCourses);

        if(instructorApiData.length){
            setInstructorData(instructorApiData);
        }
        if(result){
            setCourses(result.instructorCourses);
        }
        setLoading(false);
    }
    findInstructorData();
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated, 0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled, 0
  );

  return (
    <div className='bg-richblack-900 w-[calc(100vw-18%)] h-full p-16'>
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-richblack-5">
                Hi {user?.fName} 👋
            </h2>
            <p className="font-medium text-richblack-200">
                Let's Start Something New
            </p>
        </div>
        {
            loading ? (
                <div className='spinner'></div>
            ) : courses.length > 0 ? (
                <div className='w-[calc(100vw-28%)]'>
                    <div className="my-4 flex space-x-6 h-[450px]">
                        <div className='w-[76%] h-[450px]'>
                        {
                            totalAmount > 0 || totalStudents > 0 ?
                            <InstructorChart courses={instructorData}/> : 
                            (<div className="flex-1 rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                                <p className="mt-4 text-xl font-medium text-richblack-50">
                                    Not Enough Data To Visualize
                                </p>
                            </div>)
                        }
                        </div>
                        <div className="flex flex-col rounded-md bg-richblack-800 p-6 w-[22%]">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="text-lg text-richblack-200">Total Courses</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{courses.length}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Students</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Income</p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        Rs. {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-richblack-800 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                            <Link to={"/dashboard/my-courses"}>
                                <p className="text-xs font-semibold text-yellow-50">View All</p>
                            </Link>
                        </div>
                        <div className="my-4 flex items-start space-x-6">
                            {
                                courses.slice(0, 3).map((course) => {
                                    return (<div key={course._id} className="w-1/3">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="h-[201px] w-full rounded-md object-cover"
                                        />
                                        <div className="mt-3 w-full">
                                            <p className="text-sm font-medium text-richblack-50">
                                                {course.courseName}
                                            </p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <p className="text-xs font-medium text-richblack-300">
                                                    {course.studentsEnrolled.length} students
                                                </p>
                                                <p className="text-xs font-medium text-richblack-300">
                                                    |
                                                </p>
                                                <p className="text-xs font-medium text-richblack-300">
                                                    Rs. {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            ) : (<div className="mt-20 w-[calc(100vw-30%)] rounded-md bg-richblack-800 p-6 py-20">
                    <p className="text-center text-2xl font-bold text-richblack-5">
                        You haven't Created any Course Yet.
                    </p>
                    <Link to={"/dashboard/add-course"}>
                        <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                            Create a course
                        </p>
                    </Link>
            </div>)
        }
    </div>
  )
}

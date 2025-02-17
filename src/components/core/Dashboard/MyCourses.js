import React, { useEffect, useState } from 'react'
import { CTAButton } from '../HomePage/CTAButton'
import { VscAdd } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { CoursesTable } from './InstructorCourses/CoursesTable'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'

export const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [timeDuration, setTimeDuration] = useState([]);

    const fetchCourses = async() => {
        const result = await fetchInstructorCourses(token);
        if(result){
            // console.log("Inside MyCourses Component", result);
            setCourses(result.instructorCourses);
            setTimeDuration(result.totalDuration);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])

  return (<div className='w-[1100px] min-w-[9/12] pt-12 pl-24'>
    <div className="mb-14 flex items-center justify-between">
        <h2 className="text-3xl font-medium text-richblack-5">
            My Courses
        </h2>
        <CTAButton active={true} linkto={'/dashboard/add-course'}>
            <div className='flex justify-center items-center gap-2'>
                <VscAdd/>
                Add Course
            </div>
        </CTAButton>
    </div>
    {
        courses && <CoursesTable 
            courses={courses} 
            setCourses={setCourses} 
            timeDuration={timeDuration}
            setTimeDuration={setTimeDuration}
        />
    }
  </div>)
}

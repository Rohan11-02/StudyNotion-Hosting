import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { formatDate } from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utils/constants'
import { HiClock } from 'react-icons/hi'
import { FaCheck } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../../common/Modal'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'

export const CoursesTable = ({courses, setCourses, timeDuration, setTimeDuration}) => { 

  const TRUNCATE_LENGTH = 30
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const {token} = useSelector((state) => state.auth);

  const handleCourseDelete = async(courseId) => {
    await deleteCourse({courseId}, token);
    const result = await fetchInstructorCourses(token);
    if(result){
      setCourses(result.instructorCourses);
      setTimeDuration(result.totalDuration);
    }
    setConfirmationModal(null);
  }

  if(courses.length === 0){
    return (<div>
      No Course Found
    </div>)
  }

  return (<div>
    <Table className="rounded-xl border border-richblack-800 ">
      <Thead>
        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
            Courses
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            Duration
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            Price
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          courses.map((course, index) => {
            return (<Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
              <Td className="flex flex-1 gap-x-4">
                <img
                  src={course.thumbnail}
                  alt=''
                  className="h-[148px] w-[220px] rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {
                      course.description.split(" ").length > TRUNCATE_LENGTH ? (
                        course.description
                        .split(" ")
                        .slice(0, TRUNCATE_LENGTH)
                        .join(" ") + "..."
                      ) : (
                        course.description
                      )
                    }
                  </p>
                  <p className="text-[12px] text-white">
                    Created : {formatDate(course.createdAt)}
                  </p>
                  {
                    course.status === COURSE_STATUS.DRAFT ?
                    (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                      <HiClock/>
                      Drafted
                    </p>) : 
                    (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <FaCheck/>
                      Published
                    </p>)
                  }
                </div>
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                {timeDuration[index]}
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                ₹{course.price}
              </Td>
              <Td className="text-sm font-medium text-richblack-100 ">
                <button
                  onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  title='Edit'
                  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                >
                  <FiEdit2 size={20}/>
                </button>
                <button
                  title='Delete'
                  onClick={() => setConfirmationModal({
                    text1 : "Do you want to delete this course ?",
                    text2 : "All the data related to this course will be Deleted.",
                    btn1Text : "Delete",
                    btn2Text : "Cancel",
                    btn1Handler : () => handleCourseDelete(course._id),
                    btn2Handler : () => setConfirmationModal(null)
                  })}
                  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                >
                  <RiDeleteBin6Line size={20}/>
                </button>
              </Td>
            </Tr>)
          })
        }
      </Tbody>
    </Table>
    {
      confirmationModal && <Modal modalData={confirmationModal}/>
    }
  </div>)
}

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CTAButton } from '../../../HomePage/CTAButton';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../redux/slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

export const PublishCourse = () => {

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  }

  const onSubmit = async(data) => {
    // console.log("Inside Publish Course", data);

    if((course?.status === COURSE_STATUS.PUBLISHED && data.public === true) ||
        (course?.status === COURSE_STATUS.DRAFT && data.public === false)){
        // form has not been updated
        // no need to make api call
        goToCourses();
        return ; 
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = data.public ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    const result = await editCourseDetails(formData, token);
    if(result){
        goToCourses();
    }
  }

  const goBack = () => {
    dispatch(setStep(2));
  }

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
        setValue("public", true);
    }
  }, [])

  return (<div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">
            <input
                id='public'
                type='checkbox'
                {...register("public")}
                className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <label htmlFor='public' className="inline-flex items-center text-lg ml-2 text-richblack-400">
                Make this course as Public.
            </label>
        </div>
        <div className='flex justify-end gap-4'>
            <div>
              <button onClick={goBack} type='button' className='rounded-lg py-[12px] px-[24px] bg-richblack-700 text-white
              hover:scale-95 transition-all duration-200 w-full'>
                  Back
              </button>
            </div>
            <CTAButton type='submit' active={true}>
                    Save Changes
            </CTAButton>
        </div>
    </form>
  </div>)
}

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { CTAButton } from '../../HomePage/CTAButton';
import { createRating, findRatingAndReview, updateRating_Review } from '../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';


export const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(null);
  const {courseData} = useSelector((state) => state.viewCourse);

  const { 
    handleSubmit,
    register,
    setValue,
    getValues,
    formState : {errors}
  } = useForm();


  const onSubmit = async(data) => {
    // console.log("Printing FormData", data);
    const result = await createRating({
      courseId : courseData._id,
      rating : data.courseRating,
      review : data.courseExperience
    }, token);

    // console.log("Printing courseReviewModal success", result);
    setReviewModal(false);
  } 

  const ratingChanged = (newRating) => {
    // console.log("Printing New Rating inside CourseReviewModal", newRating);
    setValue("courseRating", newRating, {shouldValidate : true});
  }

  const findReviewsByUser = async() => {
    const result = await findRatingAndReview(courseData._id, token);
    // console.log("Inside CourseReview Modal", result);
    if(result){
      setEdit(result);
    }
  }

  useEffect(() => {

    if(edit){
      setValue("courseRating", edit.rating);
      setValue("courseExperience", edit.review);
    }
  }, [edit,setValue])

  useEffect(() => {
    findReviewsByUser();
  }, [])

  const isFormDataUpdated = () => {
    const currentValues = getValues();
    if((edit.rating !== currentValues.courseRating) || 
      (edit.review !== currentValues.courseExperience)){
        return true;
    }
    return false;
  }

  const updateSubmit = async(data) => {
    if(isFormDataUpdated()){
      const currentValues = getValues();
      const formData = new FormData();
      // console.log("Printing Data", edit);
      formData.append("courseId", courseData._id);
      if(edit.rating !== currentValues.courseRating){
        formData.append("courseRating", data.courseRating);
      }
      if(edit.review !== currentValues.courseExperience){
        formData.append("courseExperience", data.courseExperience);
      }

      const response = await updateRating_Review(formData, token);
      // if(response){
      //   console.log("Printing inside updated data in CourseReviewModal", response);
      // }
      setReviewModal(false);
    }
    else{
      toast.error("No Changes Made So Far.")
    }
  } 

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button 
            onClick={() => setReviewModal(false)}
            title='Close'
          >
            <RxCross2 className="text-2xl text-richblack-5"/>
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt='user Image'
              className='aspect-square  w-[50px] rounded-full object-cover'
            />
            <div>
              <p className="font-semibold text-richblack-5">{user?.fName} {user?.lName}</p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={edit ? handleSubmit(updateSubmit) : handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <div>
              <ReactStars
                key={edit ? edit?.rating : 0}
                count={5}
                size={24}
                activeColor="#ffd700"
                onChange={ratingChanged}
                value={edit?.rating}
              />
              <input
                type='hidden'
                name='courseRating'
                {...register("courseRating", {required : true})}
              />
              {
                errors.courseRating && (
                  <span>Please Rate Us.</span>
                )
              }
            </div>
            <div className="flex w-11/12 flex-col space-y-2">
              <label htmlFor='courseExperience' className="text-sm text-richblack-5">
                Add Your Experience<sup className="text-pink-200">*</sup>
              </label>
              <textarea
                name='courseExperience'
                placeholder='Add Your Experience Here.'
                {...register("courseExperience", {required : true})}
                className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none min-h-[130px]'
              />
              {
                errors.courseExperience && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">Please Add Your Experience.</span>
                )
              }
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <div>
                <button 
                  type='button'
                  className='rounded-lg py-[12px] px-[24px] bg-richblack-700 text-white 
                  hover:scale-95 transition-all duration-200 w-full'
                  onClick={() => setReviewModal(false)}
                >
                  Cancel
                </button>
              </div>
              <div>
                <CTAButton type='submit' active={true}>
                  {
                    edit ? "Update" : "Save"
                  }
                </CTAButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
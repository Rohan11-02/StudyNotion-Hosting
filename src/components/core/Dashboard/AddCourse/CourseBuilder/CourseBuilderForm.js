import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoPlusCircle } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { NestedView } from './NestedView';
import { CTAButton } from '../../../HomePage/CTAButton';
import { MdNavigateNext } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from '../../../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

export const CourseBuilderForm = () => {
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState : {errors}
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const onSubmit = async(data) => {

    let result = null;
    if(editSectionName){
      result = await updateSection({
        sectionId : editSectionName,
        sectionName : data.sectionName,
        courseId : course._id
      }, token)
    }
    else{
      result = await createSection({
        sectionName : data.sectionName,
        courseId : course._id
      }, token);
    }
    if(result){
      // console.log("section result", result)
      dispatch(setCourse(result))
      setEditSectionName(null);
      setValue("sectionName", "");
    }
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  
  const goToNext = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section");
      return ;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return ;
    }
    dispatch(setStep(3));
  }

  return (<div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor='section'>
          Section Name<sup className="text-pink-200">*</sup>
        </label>
        <input
          id='section'
          name='sectionName'
          placeholder='Add a section to build your course.'
          className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
          rounded-lg p-3 text-richblack-5 outline-none'
          {...register('sectionName', {required : true})}
        />
        {errors.sectionName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Section Name is Required.
          </span>
        )}
      </div>
      <div className="flex items-end gap-x-4">
        <button type='submit' className='flex gap-4 text-yellow-50 border border-yellow-50 px-4 py-2 rounded-md'>
          {
            editSectionName ? "Edit Section Name" : "Create Section"
          }
          <GoPlusCircle size={20} className="text-yellow-50"/>
        </button>
        {
          editSectionName && (
            <button
              type='button'  
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )
        }
      </div>
    </form>
    {
      course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
      )
    }
    <div className="flex justify-end gap-x-3">
      <div>
        <button onClick={goBack} className={`rounded-lg py-[12px] px-[24px] bg-richblack-700 text-white 
          hover:scale-95 transition-all duration-200 w-full`}>
          Back
        </button>
      </div>
      <div onClick={goToNext}>
        <CTAButton active={true} type='submit'>
          <div className='flex justify-center items-center'>
            Next
            <MdNavigateNext />
          </div>
        </CTAButton>
      </div>
    </div>
  </div>)
}

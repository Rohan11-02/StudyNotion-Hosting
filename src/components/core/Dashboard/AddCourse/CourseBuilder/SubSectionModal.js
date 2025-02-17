import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx';
import { Upload } from '../Upload';
import { CTAButton } from '../../../HomePage/CTAButton';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';

export const SubSectionModal = ({
  modalData, 
  setModalData, 
  add = false, 
  view = false, 
  edit = false
}) => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState : {errors}
  } = useForm();

  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if((currentValues.lectureTitle !== modalData.title) ||
      (currentValues.lectureDesc !== modalData.description) ||
      (currentValues.lectureVideo !== modalData.videoUrl)){
        return true;
    }
    return false;
  }

  const handleEditSubSection = async() => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("subSectionId", modalData._id);
    formData.append("sectionId", modalData.sectionId);
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("videoFile", currentValues.lectureVideo)
    }
    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle)
    }
    if(currentValues.lectureDesc !== modalData.description){
      formData.append("description", currentValues.lectureDesc);
    }

    const result = await updateSubSection(formData, token)
    if(result){
      // console.log("Inside Sub Section Modal", course);
      // console.log("modal Data id,s", modalData._id);
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === modalData.sectionId ? result : section
      )

      const updatedCourse = {...course, courseContent : updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
  }


  const onSubmit = async(data) => {
    if(view){
      return ;
    }

    if(edit){
      if(!isFormUpdated()){
        toast.error("No changes made to the form")
      }
      else{
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoFile", data.lectureVideo)

    const result = await createSubSection(formData, token);
    // console.log("Inside subSectionModal", result);
    if(result){
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === modalData ? result : section
      )

      // console.log("Updated Course Content", updatedCourseContent);

      const updatedCourse = {...course, courseContent : updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null)
  }

  return (<div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
    <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
        <p className="text-xl font-semibold text-richblack-5">
          {
            view && "Viewing"
          }
          {
            edit && "Editing"
          }
          {
            add && "Adding"
          }
          Lecture
        </p>
        <button onClick={() => setModalData(null)}>
          <RxCross2 className="text-2xl text-richblack-5"/>
        </button>
      </div>
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 px-8 py-10"
      >
        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor='lectureTitle'>
            Lecture Title{!view && (<sup className="text-pink-200">*</sup>)}
          </label>
          <input
            id='lectureTitle'
            disabled={view}
            placeholder='Enter Lecture Title'
            {...register("lectureTitle", {required : true})}
            className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none'
          />
          {
            errors.lectureTitle && (<span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture title is required.
            </span>)
          }
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor='lectureDesc'>
            Lecture Description{!view && (<sup className="text-pink-200">*</sup>)}
          </label>
          <textarea
            id='lectureDesc'
            disabled={view}
            placeholder='Enter Lecture Description'
            {...register("lectureDesc", {required : true})}
            className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none min-h-[130px]'
          />
          {
            errors.lectureDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture Description is required.
            </span>)
          }
        </div>
        {
          !view && (
            <div className="flex justify-end">
              <CTAButton active={true} type='submit'>
                {
                  edit ? "Save Changes" : "Save"
                }
              </CTAButton>
            </div>
          )
        }
      </form>
    </div>
  </div>)
}

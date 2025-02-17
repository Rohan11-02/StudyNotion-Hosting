import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI.js'
import { RequirementField } from './RequirementField.js'
import { CTAButton } from '../../../HomePage/CTAButton.js'
import { COURSE_STATUS } from '../../../../../utils/constants.js'
import { setCourse, setStep } from '../../../../../redux/slices/courseSlice.js'
import toast from 'react-hot-toast'
import { ChipInput } from './ChipInput.js'
import { Upload } from '../Upload.js'
import { MdNavigateNext } from 'react-icons/md'



export const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState : {errors}
  } = useForm()
    
  const dispatch = useDispatch();
  const token = useSelector((state) => (state.auth.token));
  const {course, editCourse} = useSelector((state) => (state.course));
//   console.log("Into courseInfo", course);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async() => {
    try{
        const categories = await fetchCourseCategories();
        // console.log("Inside CourseInformationForm", categories);
        if(categories.length > 0){
            setCourseCategories(categories);
        }
    }
    catch(err){
        console.log("COURSE_CATEGORY_API API ERROR............", err);
    }
  }

  useEffect(() => {
    getCategories();

    if(editCourse){
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.description);
        setValue("coursePrice", course.price);
        setValue("courseBenefits", course.whatYouWillLearn);
        // console.log("course Category", course.category._id);
        // console.log("course image", course.thumbnail);
        setValue("courseImage", course.thumbnail);
    }
  }, [])

  useEffect(() => {
    if(editCourse && courseCategories.length > 0){
        setValue("courseCategory", course.category._id);
    }
  }, [editCourse, courseCategories, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("isFormUpdated", currentValues);
    // console.log("without json", course.instructions);
    // console.log("without json", Array.isArray(course.instructions));
    // console.log("with json", JSON.parse(course.instructions));
    // console.log("with json", Array.isArray(JSON.parse(course.instructions)));
    // console.log("file is present", currentValues.courseImage);

    if((currentValues.courseTitle !== course.courseName) || 
        (currentValues.courseShortDesc !== course.description) ||
        (currentValues.coursePrice !== course.price) ||
        (currentValues.courseBenefits !== course.whatYouWillLearn) ||
        (currentValues.courseCategory !== course.category._id) ||
        (currentValues.courseRequirements !== JSON.parse(course.instructions)) ||
        (currentValues.courseTags !== JSON.parse(course.tag)) ||
        (currentValues.courseImage !== course.thumbnail)){
        return true;
    }
    return false;
  }

  const onSubmit = async(data) => {
    // console.log("Inside CourseInformationForm", data);

    if(editCourse){
        if(isFormUpdated()){
            const currentValues = getValues();
            const formData = new FormData();
            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
            if(currentValues.courseShortDesc !== course.description){
                formData.append("description", data.courseShortDesc);
            }
            if(currentValues.coursePrice !== course.price){
                formData.append("price", data.coursePrice);
            }
            if(currentValues.courseBenefits !== course.whatYouWillLearn){
                formData.append("whatYouWillLearn", data.courseBenefits);
            }
            if(currentValues.courseCategory !== course.category._id){
                formData.append("categoryId", data.courseCategory);
            }
            if(currentValues.courseRequirements !== JSON.parse(course.instructions)){
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            if(currentValues.courseTags !== JSON.parse(course.tag)){
                formData.append("tag", JSON.stringify(data.courseTags));
            }
            if(currentValues.courseImage !== course.thumbnail){
                
                formData.append("thumbnailImage", data.courseImage);
            }

            const result = await editCourseDetails(formData, token);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            // console.log("PRINTING FORMDATA", formData);
            // console.log("PRINTING result", result);
        }
        else{
            toast.error("No Changes made so far")
        }
        return ;
    }

    // Create a new Course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("description", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("categoryId", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnailImage", data.courseImage)

    // console.log("BEFORE add course API call");
    // console.log("PRINTING FORMDATA", formData);

    const result = await addCourseDetails(formData, token);
    if(result){
        dispatch(setStep(2));
        dispatch(setCourse(result));
    }
    // console.log("PRINTING FORMDATA", formData);
    // console.log("PRINTING result", result);
  }


  return (<form onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
  >
    <div className="flex flex-col space-y-2">
        <label htmlFor='title' className="text-sm text-richblack-5">
            Course Title
            <sup className="text-pink-200">*</sup>
        </label>
        <input
            id='title'
            name='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", {required : true})}
            className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none'
        />
        {
            errors.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required.</span>
            )
        }
    </div>

    <div className="flex flex-col space-y-2">
        <label htmlFor='shortDesc' className="text-sm text-richblack-5">
            Course Short Description
            <sup className="text-pink-200">*</sup>
        </label>
        <textarea
            id='shortDesc'
            name='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc", {required : true})}
            className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none min-h-[130px]'
        />
        {
            errors.courseShortDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required</span>
            )
        }
    </div>

    <div className="flex flex-col space-y-2">
        <label htmlFor='price' className="text-sm text-richblack-5">
            Course Price
            <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
            <input
                id='price'
                name='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required : true,
                    valueAsNumber : true
                })}
                className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
                rounded-lg p-3 text-richblack-5 outline-none pl-12'
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
        </div>
        {
            errors.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required.</span>
            )
        }
    </div>

    <div className="flex flex-col space-y-2">
        <label htmlFor='category' className="text-sm text-richblack-5">
            Course Category
            <sup className="text-pink-200">*</sup>
        </label>
        <select 
        id='category'
        name='courseCategory'
        {...register("courseCategory", {required : true})}
        className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
        rounded-lg p-3 text-richblack-5 outline-none'
        >
            <option value="">Choose a Category</option>
            {
                courseCategories.map((category) => {
                    return (<option key={category._id} value={category._id}>{category.name}</option>)
                })
            }
        </select>
        {
            errors.courseCategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Category is Required
                </span>
            )
        }
    </div>

        {/* create a custom component for handling tags input */}
    <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and Press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
    />


        {/* create a component for uploading and showing preview of media */}
    <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
    />


    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor='benefits'>
            Benefits of Course
            <sup className="text-pink-200">*</sup>
        </label>
        <textarea
            id='benefits'
            name='courseBenefits'
            placeholder='Enter benefits of course'
            {...register("courseBenefits", {required : true})}
            className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none min-h-[130px]'
        />
        {
            errors.courseBenefits && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Benefits of the course are required.
                </span>
            )
        }
    </div>
    <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
    />

    <div className="flex justify-end gap-x-2">
        {
            editCourse && (
                <button
                    onClick={() => dispatch(setStep(2))}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Continue without Saving
                </button>
            )
        }
        <CTAButton active={true} type='submit'>
            <div className='flex justify-center items-center'>
            {
                !editCourse ? "Next" : "Save Changes"
            }
                <MdNavigateNext/>
            </div>
        </CTAButton>
    </div>
  </form>)
}



import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const RequirementField = ({name, label, register, errors, setValue, getValues}) => {

  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const {course, editCourse} = useSelector((state) => (state.course));

  const handleAddRequirement = () => {
    if(requirement){
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  }

  useEffect(() => {

    if(editCourse){
      setRequirementList(JSON.parse(course.instructions));
    }

    register(name, {
      required : true
    })
  }, [])

  useEffect(() => {
    // setValue is used when the value is changing continuously
    setValue(name, requirementList);
  }, [requirementList])

  return (
    <div className="flex flex-col space-y-2"> 
      <label className="text-sm text-richblack-5" htmlFor='requirements'>
        {label}<sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
            id='requirements'
            name={name}
            type='text'
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='placeholder:text-richblack-200 bg-richblack-900 w-full h-[48px] 
            rounded-lg p-3 text-richblack-5 outline-none'
        />
        <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>
          Add
        </button>
      </div>

      {
        requirementList.length > 0 && (
          <ul className="mt-2 list-inside list-disc">
            {
              requirementList.map((requirement, index) => {
                return (<li key={index} className="flex items-center text-richblack-5">
                  <span>{requirement}</span>
                  <button 
                    className="ml-2 text-xs text-pure-greys-300" 
                    type='button' 
                    onClick={() => handleRemoveRequirement(index)}
                    >
                    Clear
                  </button>
                </li>)
              })
            }
          </ul>
        )
      }
      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is Required.
          </span>
        )
      }
    </div>
  )
}




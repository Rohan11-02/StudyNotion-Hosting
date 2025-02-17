import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, ControlBar, Player } from 'video-react';
import { CTAButton } from '../../HomePage/CTAButton';
import "video-react/dist/video-react.css"
import { markLectureAsComplete } from '../../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../../redux/slices/viewCourseSlice';

export const VideoDetails = () => {
  
  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseData, sectionData, completedLectures} = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  // console.log("Printing inside setVideoSpecificDetails", sectionData);


  useEffect(() => {
    const setVideoSpecificDetails = async() => {
      if(!sectionData.length){
        return;
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }
      else{
        const filteredData = sectionData?.filter(
          (section) => section._id === sectionId
        )
      
        const filteredVideoData = filteredData?.[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        )
        // console.log("Printing inside setVideoSpecificDetails", filteredVideoData);
        setVideoData(filteredVideoData?.[0]);
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  }, [sectionData, courseData, location.pathname])

  const handleLectureCompletion = async() => {
    const result = await markLectureAsComplete({
      courseId : courseId,
      subSectionId : subSectionId
    }, token);
    if(result){
      dispatch(updateCompletedLectures(subSectionId))
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIdx = sectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIdx = sectionData?.[currentSectionIdx]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIdx === 0){
      const prevSectionId = sectionData?.[currentSectionIdx - 1]._id;
      const noOfSubSections = sectionData?.[currentSectionIdx - 1]?.subSection?.length;
      const prevSubSectionId = sectionData?.[currentSectionIdx - 1]?.subSection?.[noOfSubSections - 1]?._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`)
    }
    else{
      const prevSubSectionId = sectionData?.[currentSectionIdx]?.subSection?.[currentSubSectionIdx - 1]?._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`)
    }
  }

  const isFirstVideo = () => {
    const currentSectionIdx = sectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIdx = sectionData?.[currentSectionIdx]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIdx === 0 && currentSubSectionIdx === 0){
      return true;
    }
    return false;
  }

  const isLastVideo = () => {
    const currentSectionIdx = sectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = sectionData?.[currentSectionIdx]?.subSection?.length

    const currentSubSectionIdx = sectionData?.[currentSectionIdx]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIdx === sectionData?.length - 1 && 
      currentSubSectionIdx === noOfSubSections - 1
    ){
      return true;
    }
    return false;
  }

  const goToNextVideo = () => {
    const currentSectionIdx = sectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = sectionData?.[currentSectionIdx]?.subSection?.length;

    const currentSubSectionIdx = sectionData?.[currentSectionIdx]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIdx !== noOfSubSections - 1){
      const nextSubSectionId = sectionData?.[currentSectionIdx]?.subSection?.[currentSubSectionIdx + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`)
    }
    else{
      const nextSectionId = sectionData?.[currentSectionIdx + 1]._id;
      const nextSubSectionId = sectionData?.[currentSectionIdx + 1]?.subSection?.[0]?._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`)
    }
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData ? (<div>
          No Data Found
        </div>) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position='center'/>
            {
              videoEnded && (
                <div
                  style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                  className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                >
                  {
                    !completedLectures.includes(subSectionId) && (
                      <div onClick={() => handleLectureCompletion()}>
                        <CTAButton active={true} type='submit'>
                          Mark As Complete
                        </CTAButton>
                      </div>
                    )
                  }

                  <div onClick={() => {
                    if(playerRef.current){
                      playerRef.current.seek(0);
                      setVideoEnded(false)
                    }
                  }}>
                    <CTAButton active={true} type='submit'>
                      ReStart
                    </CTAButton>
                  </div>

                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                    <div>
                      {
                        !isFirstVideo() && (
                          <div onClick={goToPrevVideo}>
                            <CTAButton active={false} type='submit'>
                              Prev
                            </CTAButton>
                          </div>
                        )
                      }
                    </div>

                    <div>
                      {
                        !isLastVideo() && (
                          <div onClick={goToNextVideo}>
                            <CTAButton active={true} type='submit'>
                              Next
                            </CTAButton>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              )
            }
          </Player>
        )
      }
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

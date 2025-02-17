import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sectionData : [],
    courseData : [],
    completedLectures : [],
    totalNoOfLectures : 0
}

const viewCourseSlice = createSlice({
    name : "viewCourse",
    initialState,
    reducers : {
        setSectionData : (state, action) => {
            state.sectionData = action.payload;
        },
        setCourseData : (state, action) => {
            state.courseData = action.payload;
        },
        setCompletedLectures : (state, action) => {
            state.completedLectures = action.payload;
        },
        setTotalNoOfLectures : (state, action) => {
            state.totalNoOfLectures = action.payload;
        },
        updateCompletedLectures : (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        }
    }
})

export const {
    setSectionData,
    setCourseData,
    setCompletedLectures,
    setTotalNoOfLectures,
    updateCompletedLectures
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
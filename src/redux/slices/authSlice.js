import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loader : false,
    signupData : null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}
export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setToken : (state, action) => {
            state.token = action.payload;
        },
        setSignupData : (state, action) => {
            state.signupData = action.payload;
        },
        setLoader : (state, action) => {
            state.loader = action.loader;
        }
    }
})

export const {setToken, setSignupData, setLoader} = authSlice.actions;
export default authSlice.reducer;
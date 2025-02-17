import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { NavBar } from "./components/common/NavBar";
import { VerifyEmail } from "./pages/VerifyEmail";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { ForgotPasswordToken } from "./pages/ForgotPasswordToken";
import { ResetPassword } from "./pages/ResetPassword";
import { About } from "./pages/About";
import { ContactUs } from "./pages/ContactUs";
import { PrivateRoute } from "./components/core/Dashboard/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { Error } from "./pages/Error";
import { Settings } from "./components/core/Dashboard/Settings/index";
import { EnrolledCourses } from "./components/core/Dashboard/EnrolledCourses";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import { Cart } from "./components/core/Dashboard/Cart";
import { AddCourse } from "./components/core/Dashboard/AddCourse";
import { MyCourses } from "./components/core/Dashboard/MyCourses";
import { EditCourse } from "./components/core/Dashboard/EditCourse/index";
import { Catalog } from "./pages/Catalog";
import { CourseDetails } from "./pages/CourseDetails";
import { ViewCourse } from "./pages/ViewCourse";
import { VideoDetails } from "./components/core/Dashboard/ViewCourse/VideoDetails";
import { Instructor } from "./components/core/Dashboard/Instructor";
import { getUserEnrolledCourses } from "./services/operations/profileAPI";
import { logout } from "./services/operations/Thunks";
import { useEffect } from "react";
import { fetchInstructorCourses } from "./services/operations/courseDetailsAPI";


function App() {
  const user = useSelector((state) => (state.profile.user));
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("Inside App.js", user);

  const getEnrolledCourses = async() => {
    const response = await getUserEnrolledCourses(token);
    // console.log("Printing in App.js", response);
    if(!response){
      dispatch(logout(navigate));
    }
  }

  const fetchCourses = async() => {
    const response = await fetchInstructorCourses(token);
    // console.log("Inside App.js Printing Instructor Courses", response.instructorCourses);
    if(!response.instructorCourses){
      dispatch(logout(navigate));
    }
  }

  useEffect(() => {
    if(user?.accountType === ACCOUNT_TYPE.STUDENT){
      getEnrolledCourses();
    }
    if(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      fetchCourses();
    }
  }, [])

  return (<div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/catalog/:catalogName" element={<Catalog/>}/>
      <Route path="/courses/:courseId" element={<CourseDetails/>}/>
      
      <Route path="/signup" element={<OpenRoute>
        <Signup/>
      </OpenRoute>}/>
      <Route path="/login" element={<OpenRoute>
        <Login/>
      </OpenRoute>}/>
      <Route path="/verify-email" element={<VerifyEmail/>}/>
      <Route path="/forgot-password" element={<ForgotPasswordToken/>}/>
      <Route path="/update-password/:id" element={<ResetPassword/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<ContactUs/>}/>

      <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
        <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
        <Route path="/dashboard/settings" element={<Settings/>}/>

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/dashboard/cart" element={<Cart/>} />
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )
        }
        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/add-course" element={<AddCourse/>}/>
              <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
              <Route path="/dashboard/instructor" element={<Instructor/>}/>
            </>
          )
        }
      </Route>
      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
          </>
        )
      }
      <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
       {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
                path="/view-course/:courseId/section/:sectionId/subSection/:subSectionId"
                element={<VideoDetails/>}
              />
            </>
          )
       }
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </div>);
}

export default App;

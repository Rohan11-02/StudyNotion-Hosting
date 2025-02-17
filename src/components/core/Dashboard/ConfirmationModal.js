// import React from 'react'
// import { CTAButton } from '../HomePage/CTAButton'
// import { useDispatch } from 'react-redux'
// import { logout } from '../../../services/operations/Thunks';
// import { useNavigate } from 'react-router-dom';

// export const ConfirmationModal = ({setConfirmationModal}) => {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return (<div className='bg-richblack-800 p-4 w-[300px] rounded-lg flex flex-col gap-2'>
//     <p className='text-richblack-5 text-2xl'>Are You Sure ?</p>
//     <p className='text-richblack-300'>You will be logged out of your Account.</p>
//     <div className='flex justify-between mt-2 px-4'>
//         <div onClick={() => (dispatch(logout(navigate)))}>
//             <CTAButton active={true} type='submit'>
//                 Log Out
//             </CTAButton>
//         </div>
//         <div onClick={() => (setConfirmationModal(false))} className="rounded-lg py-[12px] px-[24px] bg-richblack-300 text-richblack-900
//         hover:scale-95 transition-all duration-200">
//             Cancel
//         </div>
//     </div>
//   </div>)
// }

import React from 'react'
import { useSelector } from 'react-redux'
import { RenderCartCourses } from './RenderCartCourses';
import { RenderTotalAmount } from './RenderTotalAmount';

export const Cart = () => {

  const total = useSelector((state) => (state.cart.totalPrice));
  // console.log("Inside Cart function", total);
  const totalItems = useSelector((state) => (state.cart.totalItems));

  return (<div className='py-14 px-12'>
    <h2 className="mb-14 text-3xl font-medium text-richblack-5">
        Your Cart
    </h2>
    <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>
    {
        total > 0 ? (<div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <RenderCartCourses/>
            <RenderTotalAmount/>
        </div>) : 
        (<p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>)
    }
  </div>)
}

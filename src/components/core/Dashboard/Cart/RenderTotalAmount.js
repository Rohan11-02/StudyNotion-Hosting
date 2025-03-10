import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CTAButton } from '../../HomePage/CTAButton';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

export const RenderTotalAmount = () => {

  const {totalPrice, cart} = useSelector((state) => (state.cart));
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    // console.log("Bought these course:", courses);
    // TODO: API integrate -> payment gateway tak leke jaegi
    buyCourse(token, courses, user, navigate, dispatch);
  }

  return (<div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
    <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {totalPrice}</p>
    <div onClick={handleBuyCourse}>
        <CTAButton active={true} type='submit'>
            Buy Now
        </CTAButton>
    </div>
  </div>)
}

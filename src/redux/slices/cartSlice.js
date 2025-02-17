import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalPrice : localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        // add to cart
        addToCart : (state, action) => {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if(index >= 0){
                toast.error("Course is Already in Cart.");
                return;
            }
            state.totalItems++;
            state.cart.push(course);
            state.totalPrice += course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

            toast.success("Course Added to Cart.");
            
        },
        // remove from cart
        removeFromCart : (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index >= 0){
                state.totalItems--;
                state.totalPrice -= state.cart[index].price;
                state.cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

            toast.success("Course Removed From Cart.");
        },
        // reset cart
        resetCart : (state) => {
            state.cart = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("totalPrice");
        }
    }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;
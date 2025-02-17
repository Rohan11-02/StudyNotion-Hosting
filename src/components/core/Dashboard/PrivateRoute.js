import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const token = useSelector((state) => (state.auth.token));
    // console.log("PrivateRoute", token);

    if(token){
        return (<div>{children}</div>)
    }
    else{
        return (<Navigate to={"/login"}/>)
    }
}

import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { ProfileDropDown } from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';



export const NavBar = () => {
  
  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async() => {
    const result = await apiConnector("GET", categories.CATEGORIES_API);
    // console.log(result.data.allCategories);
    setSubLinks(result.data.allCategories);
  }

  useEffect(()=> {
    fetchSubLinks();
  },[])

  const location = useLocation();
//   console.log("Location is: ",location);

  const token = useSelector((state)=> (state.auth.token));
//   console.log("token is : ", token);
  const user = useSelector((state)=> (state.profile.user));
//   console.log("user is : ", user);
  const totalItems = useSelector((state)=> (state.cart.totalItems));
//   console.log("totalItems are :", totalItems);

  return (<div className='flex items-center w-full h-14 bg-richblack-900 border-b-[1px] border-b-richblack-700'>
    <div className='w-10/12 mx-auto flex items-center justify-between'>
        <Link to="/">
            <img src={Logo} alt=''/>
        </Link>

        <div className='flex gap-4'>
            {
                NavbarLinks.map((link, index)=>{
                    return (<div className='text-richblack-25' key={index}>
                        {
                            link.title === "Catalog" ? 
                            (<div className='flex items-center gap-2 relative group'>
                                <p>{link.title}</p>
                                <FaChevronDown className='text-sm'/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-45%] translate-y-[50%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[20%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`/catalog/${subLink.name}`} key={index}>
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>

                            </div>) 
                            : (<div className={`${link.path === location.pathname ? "text-yellow-50" : ""}`}>
                                <Link to={link.path}>
                                    {
                                        link.title
                                    }
                                </Link>
                            </div>)
                        }
                    </div>)
                })
            }
        </div>

        {/* login/ signup/ dashboard */}
        <div className="flex items-center gap-x-4">
            {
                user && user.accountType !== "Instructor" && 
                <Link to="/dashboard/cart" className='relative'>
                    <FaShoppingCart className='text-richblack-200 text-xl'/>
                    {
                        totalItems > 0 && 
                        <span className='absolute text-richblack-5 py-1 px-2 -left-3 bg-caribbeangreen-300 rounded-full 
                        text-xs animate-bounce'>
                            {totalItems}
                        </span>
                    }
                </Link>
            }
            {
                token === null && <Link to="/login" className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] 
                rounded-[8px] border border-richblack-700">
                    Log in
                </Link>
            }
            {
                token === null && <Link to="/signup" className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] 
                rounded-[8px] border border-richblack-700">
                    Sign up
                </Link>
            }
            {
                token !== null && <ProfileDropDown/>
            }
        </div>
    </div>
  </div>)
}

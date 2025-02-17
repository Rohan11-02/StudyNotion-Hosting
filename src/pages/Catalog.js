import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { Course_Card } from '../components/core/Catalog/Course_Card';
import Footer from '../components/common/Footer';

export const Catalog = () => {

  const {catalogName} = useParams();
  // console.log("Printing Catalog name", catalogName);
  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [active, setActive] = useState(1);

  const getCategories = async() => {

    const res = await fetchCourseCategories();
    const categoryId = res.filter((ct) => ct.name === catalogName)[0]._id;
    setCategoryId(categoryId);

  }

  useEffect(() => {
    getCategories();
  }, [catalogName])

  const getCategoryDetails = async() => {
    const res = await getCatalogPageData(categoryId);
    // console.log("Printing res: ", res);
    setCatalogPageData(res);
  }

  useEffect(() => {
    if(categoryId){
      getCategoryDetails();
    }
  }, [categoryId])

  return (
    <div>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">{`Home / Catalog / `}
          <span className="text-yellow-25">
            {catalogName}
          </span></p>
          <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
          <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.description}</p>
        </div> 
      </div> 

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Courses to get You Started
        </div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
            active === 1
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
            active === 2
            ? "border-b border-b-yellow-25 text-yellow-25"
            : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
        </div>
      </div>

      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Top Courses in {catalogPageData?.data?.differentCategory?.name}</div>
        <div className="py-8">
          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
        </div>
      </div>
      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {
              catalogPageData?.data?.topSellingCourses.slice(0, 4)
              .map((course, index) => {
                return <Course_Card course={course} key={index}/>
              })
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

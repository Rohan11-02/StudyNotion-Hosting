import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'


const timeLineArr = [
    {
        logo : logo1,
        title : "Leadership",
        description : "Fully committed to the success of company"
    },
    {
        logo : logo2,
        title : "Responsiblity",
        description : "Students will always be our top priority"
    },
    {
        logo : logo3,
        title : "Flexibility",
        description : "The ability to switch is an important skills"
    },
    {
        logo : logo4,
        title : "Solve the problem",
        description : "Code your way to a solution"
    }
]

export const TimeLine = () => {
  return (<div className='w-[410px] h-[432px] flex flex-col justify-evenly'>
    {
        timeLineArr.map((element, index)=>{
            return (<div key={index} className='flex items-center gap-4'>
                <div>
                    <img src={element.logo} alt=''/>
                </div>
                <div className=''>
                    <p>
                        {
                            element.title
                        }
                    </p>
                    <p>
                        {
                            element.description
                        }
                    </p>
                </div>
            </div>)
        })
    }
  </div>)
}

import { TypeAnimation } from 'react-type-animation';
import { CTAButton } from './CTAButton'
import { FaArrowRight } from "react-icons/fa";

export const CodeBlocks = ({position, heading, subHeading, ctaBtn1, ctaBtn2, codeBlock}) => {

  return (<div className={`flex h-[450px] items-center ml-40`}>
    <div className={`w-[1080px] max-w-[10/12] flex mx-auto justify-evenly ${position} items-center`}>
        {/* Section 1 */}
        <div className='w-[534px]'>
            <div className='w-[91%] flex flex-col gap-4'>
                {heading}
                <p className='text-richblack-300'>
                    {subHeading}
                </p>
                <div className='flex gap-6 mt-8'>
                    <CTAButton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
                        <div className='flex items-center gap-2'>
                            {ctaBtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
                        {ctaBtn2.btnText}
                    </CTAButton>
                </div>
            </div>
        </div>
        {/* Section 2 */}
        <div className='w-[534px] flex justify-evenly'>
            <div className='w-[5%] text-richblack-400 flex flex-col gap-1'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className='w-[88%] bg-gradient-to-r from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF] text-transparent bg-clip-text flex flex-col gap-1'>
                <TypeAnimation
                    sequence={[codeBlock, 1000, ""]}
                    style={
                        {
                            whiteSpace : "pre-line",
                            display : 'block',
                            lineHeight : "27.5px"
                        }
                    }
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  </div>)
}

"use client"


import React, { useState } from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Accordian() {

  let [filterShow, setfilterShow] = useState(-1)

  return (
    <>

      <section className=' lg:px-0 px-2 bg-gray-100 py-8 ' >
        <div className='max-w-[1140px] mx-auto ' >


          <h1 className='text-center md::text-[38px] sm::text-[28px] text-[20px] mb-6 font-semibold ' >
            Frequently asked questions
          </h1>



          <div className=' flex flex-col gap-4 ' >
            {/*///////////// first question */}
            <div className='relative border-[1px] bg-white bg-white '>
              {/* question */}
              <h3 onClick={() => setfilterShow(filterShow == 1 ? -1 : 1)} className='py-3 relative font-semibold cursor-pointer flex justify-between items-center  px-2 '>
                <span>Size</span>
                {
                  filterShow == 1 ?
                    <span className='text-[22px] font-semibold px-2'>
                      <FiMinus />
                    </span>
                    :
                    <span className='text-[22px] font-semibold px-2'>
                      <FiPlus />
                    </span>
                }
              </h3>
              {/* answer */}
              <div className={`flex flex-col gap-3 duration-100 px-2 ${filterShow == 1 ? 'max-h-[500px] px-2 opacity-100  ' : 'max-h-[0px] opacity-0'}`}>

                <p className=' py-3 text-[14px]'>
                  One Size
                </p>
              </div>
            </div>



            {/*///////////// second question */}
            <div className='relative border-[1px] bg-white '>
              <h3 onClick={() => setfilterShow(filterShow == 2 ? -1 : 2)} className='py-3 relative font-semibold cursor-pointer flex justify-between items-center  px-2 '>
                <span>Size</span>
                {
                  filterShow == 2 ?
                    <span className='text-[22px] font-semibold px-2'>
                      <FiMinus />
                    </span>
                    :
                    <span className='text-[22px] font-semibold px-2'>
                      <FiPlus />
                    </span>
                }
              </h3>

              {/* answer */}
              <div className={`flex flex-col gap-3 duration-100 px-2 ${filterShow == 2 ?
                'max-h-[500px] px-2 opacity-100  ' : 'max-h-[0px] opacity-0'}`}>

                <p className=' py-3 text-[14px]'>
                  One Size
                </p>
              </div>
            </div>


            {/*///////////// third question */}
            <div className='relative border-[1px] bg-white '>
              <h3 onClick={() => setfilterShow(filterShow == 3 ? -1 : 3)} className='py-3 relative font-semibold cursor-pointer flex justify-between items-center  px-2 '>
                <span>Size</span>
                {
                  filterShow == 3 ?
                    <span className='text-[22px] font-semibold px-2'>
                      <FiMinus />
                    </span>
                    :
                    <span className='text-[22px] font-semibold px-2'>
                      <FiPlus />
                    </span>
                }
              </h3>

              {/* answer */}
              <div className={`flex flex-col gap-3 duration-100 px-2 ${filterShow == 3 ?
                'max-h-[500px] px-2 opacity-100  ' : 'max-h-[0px] opacity-0'}`}>

                <p className=' py-3 text-[14px]'>
                  One Size
                </p>
              </div>
            </div>


            {/*///////////// fourth question */}
            <div className='relative border-[1px] bg-white '>
              <h3 onClick={() => setfilterShow(filterShow == 4 ? -1 : 4)} className='py-3 relative font-semibold cursor-pointer flex justify-between items-center  px-2 '>
                <span>Size</span>
                {
                  filterShow == 4 ?
                    <span className='text-[22px] font-semibold px-2'>
                      <FiMinus />
                    </span>
                    :
                    <span className='text-[22px] font-semibold px-2'>
                      <FiPlus />
                    </span>
                }
              </h3>

              {/* answer */}
              <div className={`flex flex-col gap-3 duration-100 px-2 ${filterShow == 4 ?
                'max-h-[500px] px-2 opacity-100  ' : 'max-h-[0px] opacity-0'}`}>

                <p className=' py-3 text-[14px]'>
                  One Size
                </p>
              </div>
            </div>


            {/*///////////// fifth question */}
            <div className='relative border-[1px] bg-white '>
              <h3 onClick={() => setfilterShow(filterShow == 5 ? -1 : 5)} className='py-3 relative font-semibold cursor-pointer flex justify-between items-center  px-2 '>
                <span>Size</span>
                {
                  filterShow == 5 ?
                    <span className='text-[22px] font-semibold px-2'>
                      <FiMinus />
                    </span>
                    :
                    <span className='text-[22px] font-semibold px-2'>
                      <FiPlus />
                    </span>
                }
              </h3>

              {/* answer */}
              <div className={`flex flex-col gap-3 duration-100 px-2 ${filterShow == 5 ?
                'max-h-[500px] px-2 opacity-100  ' : 'max-h-[0px] opacity-0'}`}>

                <p className=' py-3 text-[14px]'>
                  One Size
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

    </>
  )
}

import React from 'react'
import { FaHouseDamage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";



export default function SeamLess() {
    return (
        <section className=' py-10 lg:px-0 px-1 bg-gray-100 ' >
            <div className='max-w-[1320px] mx-auto py-4  ' >
                <p className='text-[15px] text-[blue] text-center font-semibold py-2 px-4 bg-indigo-50 rounded w-fit mx-auto mb-2  ' >
                    How It Work
                </p>
                <h1 className='sm:text-[40px] text-[28px] text-center font-semibold ' >Browse Our Categories </h1>
                <p className='text-[17px] text-gray-600 text-center  ' >
                    explore our curated selection of premium homes
                </p>



                <div className='grid  sm:grid-cols-3 grid-cols-1
                            mt-12 md:gap-4 gap-10 md:justify-between  ' suppressHydrationWarning>
                    <SeamLessCard />
                    <SeamLessCard />
                    <SeamLessCard />
                </div>



            </div>
        </section>
    )
}


function SeamLessCard() {
    return (
        <>
            <div className=" bg-white rounded-xl shadow-xl transition-shadow duration-300  px-4 py-8 text-center flex flex-col items-center gap-1 relative 
              "suppressHydrationWarning>

                <span className='absolute top-[-30px] h-15 w-15 rounded-full bg-gradient-to-r from-[#392BFB] to-[#0F056E] text-white font-semibold flex items-center justify-center ' >
                    01
                </span>


                <div className="flex justify-center items-center w-14 h-14 mx-auto bg-indigo-50 text-indigo-600 rounded-full my-2">
                    {/* <!-- Category Icon/SVG --> */}
                    <FaVideo />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Verified Trust</h3>
                <p className="text-sm "> itaque cum maxime accusamus, perferendis nemo maiores veniam pariatur provident. Voluptas.
                </p>
            </div>
        </>
    )
}
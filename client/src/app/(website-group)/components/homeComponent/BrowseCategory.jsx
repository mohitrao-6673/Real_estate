import React from 'react'
import { FaHouseDamage } from "react-icons/fa";


export default function BrowseCategory() {
    return (
        <section className=' py-10 lg:px-0 px-1 ' >
            <div className='max-w-[1320px] mx-auto py-4  ' >

                <h1 className='sm:text-[40px] text-[28px] text-center font-semibold ' >Browse Our Categories </h1>
                <p className='text-[17px] text-gray-600 text-center  ' >
                    explore our curated selection of premium homes
                </p>



                <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2
                            mt-8 md:gap-4 gap-2 md:justify-between ' suppressHydrationWarning>
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </div>



            </div>
        </section>
    )
}


function CategoryCard() {
    return (
        <>
            <div className=" bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300  px-5 border-gray-300 py-8 text-center cursor-pointer border hover:border-[blue] ">
                <div className="flex justify-center items-center w-14 h-14 mx-auto bg-indigo-50 text-indigo-600 rounded-full mb-4">
                    {/* <!-- Category Icon/SVG --> */}
                    <FaHouseDamage />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Penthouse</h3>
                <p className="text-sm text-gray-500">8 Properties</p>
            </div>
        </>
    )
}
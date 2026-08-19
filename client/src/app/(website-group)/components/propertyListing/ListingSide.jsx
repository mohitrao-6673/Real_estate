

import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import PropertyCard from '../../common/PropertyCard';

export default function ListingSide() {
    return (
        <>
            <section className='rounded-[] px-3 bg-gray-100 ' >


                <div className=' bg-white p-2 items-center  flex flex-wrap gap-4 justify-between 
                rounded-[8px] ' suppressHydrationWarning >

                    <p className='text-gray-700 sm:text-[15px] text-[12px] sm:block hidden ' >
                        All Properties Here
                    </p>
                    <div className=' sm:hidden block flex items-center  bg-gray-100 rounded-[10px] ' >
                        <span className=' px-2 ' >
                            <IoSearchOutline className='  ' />
                        </span>
                        <div className='w-full flex items-center ' >
                            <input type="text" className='w-full py-1 px-1 outline-none
                              placeholder:text-gray-400 placeholder:text-[14px] 
                              ' placeholder='search by location' fdprocessedid="ugkv8m" suppressHydrationWarning />
                        </div>
                    </div>





                    <div className='flex items-center gap-2  ' >
                        <p> Sort : </p>
                        <div className=' w-[150px]   border-[0.5px] ' >
                            <select name="sort" id="" className='py-1 px-2 w-full outline-none ' fdprocessedid="56zje9" >
                                <option value=""> latest </option>
                                <option value=""> oldest </option>
                                <option value=""> hight to low </option>
                                <option value=""> low to hight </option>
                            </select>
                        </div>
                    </div>
                </div>


                <h1 className='px-2 text-[12px] font-semibold text-gray-500 my-3  ' >
                    44 Properties Showing
                </h1>

                <div className=' grid grid lg:grid-cols-4 md:grid-cols-2   grid-cols-1 md:gap-4 gap-2  ' >
                    <PropertyCard />

                </div>

            </section>
        </>
    )
}

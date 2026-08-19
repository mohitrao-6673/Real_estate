
import React from 'react'
import { MdOutlineMyLocation } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import PropertyCard from '../../common/PropertyCard';




export default function FeaturedProperties() {



    return (
        <>
            <section className='bg-gray-100 py-7 lg:px-0 px-1 ' >

                <div className='max-w-[1320px] mx-auto py-4  ' >


                    <h1 className='sm:text-[40px] text-[28px] md:text-left text-center font-semibold ' >Featured Properties</h1>
                    <p className='text-[17px] text-gray-600 md:text-left text-center  ' >
                        explore our curated selection of premium homes
                    </p>



                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1
                      mt-8 md:gap-4 gap-1 md:justify-between ' suppressHydrationWarning={true} >

                        {/* property card */}
                        <PropertyCard />
                    </div>



                </div>

            </section>
        </>
    )
}

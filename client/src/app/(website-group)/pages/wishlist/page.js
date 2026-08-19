
import React from 'react'
import PropertyCard from '../../common/PropertyCard'

export default function page() {
    return (
        <>



            <section className=' py-8 bg-gray-100 ' >
                <section className='max-w-[1320px] mx-auto  sm:px-4 px-2 py-4 ' >
                    <h1 className=' text-center text-[24px] font-semibold py-2 ' >
                        Your favorite properties
                    </h1>

                    <div className='mt-5 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4  ' >
                        <PropertyCard />
                    </div>
                </section>
            </section>



        </>
    )
}

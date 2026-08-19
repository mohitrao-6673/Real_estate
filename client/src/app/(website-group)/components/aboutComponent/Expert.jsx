
import React from 'react'
import ExpertCard from '../../common/ExpertCard'



export default function Expert() {



    return (
        <>

            <section className=" bg-[whitesmoke] py-[25px] " >
                <div className="max-w-[1300px] m-auto " >

                    {/* expert-header */}
                    <div className='text-center flex flex-col gap-2' >
                        <h1 className='md:text-[28px] text-[18px] font-semibold' >
                            Our Top Experts
                        </h1>
                    </div>

                    {/* expert-body */}
                    <div className=' py-8 md:px-0 px-1 grid md:grid-cols-4 grid-cols-2 sm:gap-5 gap-3 ' >
                        <ExpertCard />
                        <ExpertCard />
                        <ExpertCard />
                        <ExpertCard />
                    </div>


                </div>
            </section>

        </>
    )
}

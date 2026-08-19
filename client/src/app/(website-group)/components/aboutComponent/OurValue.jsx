import React from 'react'

export default function OurValue() {
    return (
        <>
            <section className=' py-[40px] ' >

                <div className=' max-w-[1140px] mx-auto' >
                    <div className=' grid md:grid-cols-2 grid-cols-1
                     md:gap-[60px] gap-[20px] md:px-0 px-2 items-center ' >

                        {/* content */}
                        <div className='flex flex-col' >
                            <h2 className='md:text-[26px] text-[20px] font-semibold' >Enhance your skills with best Online courses</h2>

                            <div className='flex flex-col gap-6 mt-10 text text-gray-500' >
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quasi nobis voluptas, ullam incidunt numquam delectus voluptatibus minima harum mollitia pariatur sed quia neque est tempora molestias non iusto ab.
                                </p>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quasi nobis voluptas, ullam incidunt numquam delectus voluptatibus minima harum mollitia pariatur sed quia neque est tempora molestias non iusto ab.
                                </p>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quasi nobis voluptas, ullam incidunt numquam delectus voluptatibus minima harum mollitia pariatur sed quia neque est tempora molestias non iusto ab.
                                </p>
                            </div>
                        </div>


                        {/* image */}
                        <div className='  h-full  ' >
                            <img src="/about-image1.png" className='rounded-[12px]  ' alt="" />
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}
